use std::{fmt::Debug, sync::Arc};

use async_trait::async_trait;
use once_cell::sync::Lazy;
use regex::Regex;
use rustbolt_core::{
  get_scheme, ApplyContext, CompilerOptions, Content, ModuleFactoryCreateData,
  NormalModuleFactoryResolveForScheme, NormalModuleFactoryResolveInScheme,
  NormalModuleReadResource, Plugin, PluginContext, ResourceData, Scheme,
};
use rustbolt_error::Result;
use rustbolt_fs::WritableFileSystem;
use rustbolt_hook::{plugin, plugin_hook};
use rustbolt_util::asset_condition::{AssetCondition, AssetConditions};

use crate::http_cache::{fetch_content, FetchResultType, HttpClient};

static EXTERNAL_HTTP_REQUEST: Lazy<Regex> =
  Lazy::new(|| Regex::new(r"^(//|https?://|#)").expect("Invalid regex"));

#[plugin]
#[derive(Debug)]
pub struct HttpUriPlugin {
  options: HttpUriPluginOptions,
}

impl HttpUriPlugin {
  pub fn new(options: HttpUriPluginOptions) -> Self {
    Self::new_inner(options)
  }
}

#[derive(Debug)]
pub struct HttpUriPluginOptions {
  pub allowed_uris: HttpUriOptionsAllowedUris,
  pub cache_location: Option<String>,
  pub frozen: Option<bool>,
  pub lockfile_location: Option<String>,
  pub proxy: Option<String>,
  pub upgrade: Option<bool>,
  pub filesystem: Arc<dyn WritableFileSystem>,
  pub http_client: Arc<dyn HttpClient>,
}

#[plugin_hook(NormalModuleFactoryResolveForScheme for HttpUriPlugin)]
async fn resolve_for_scheme(
  &self,
  _data: &mut ModuleFactoryCreateData,
  _resource_data: &mut ResourceData,
  scheme: &Scheme,
) -> Result<Option<bool>> {
  Ok(if scheme.is_http() || scheme.is_https() {
    Some(true)
  } else {
    None
  })
}

#[plugin_hook(NormalModuleFactoryResolveInScheme for HttpUriPlugin)]
async fn resolve_in_scheme(
  &self,
  data: &mut ModuleFactoryCreateData,
  resource_data: &mut ResourceData,
  _scheme: &Scheme,
) -> Result<Option<bool>> {
  if !matches!(
    get_scheme(data.context.as_str()),
    Scheme::Http | Scheme::Https
  ) {
    return Ok(None);
  }

  let base_url = match url::Url::parse(data.context.as_str()) {
    Ok(url) => url,
    Err(_) => return Ok(None),
  };

  let resource_url = match url::Url::parse(&resource_data.resource) {
    Ok(url) if url.scheme() == "http" || url.scheme() == "https" => return Ok(None),
    Ok(_) | Err(_) => resource_data.resource.clone(),
  };

  let resource_set = base_url
    .join(&resource_url)
    .map(|url| url.to_string())
    .unwrap_or_else(|_| resource_data.resource.clone());

  resource_data.set_resource(resource_set);

  Ok(Some(true))
}

#[plugin_hook(NormalModuleReadResource for HttpUriPlugin)]
async fn read_resource(&self, resource_data: &ResourceData) -> Result<Option<Content>> {
  if (resource_data.get_scheme().is_http() || resource_data.get_scheme().is_https())
    && EXTERNAL_HTTP_REQUEST.is_match(&resource_data.resource)
  {
    let fetch_result = fetch_content(&resource_data.resource, &self.options)
      .await
      .map_err(rustbolt_error::AnyhowError::from)?;

    if let FetchResultType::Content(content_result) = fetch_result {
      return Ok(Some(Content::from(content_result.content().to_vec())));
    }
  }
  Ok(None)
}

#[async_trait]
impl Plugin for HttpUriPlugin {
  fn name(&self) -> &'static str {
    "rustbolt.HttpUriPlugin"
  }

  fn apply(&self, ctx: PluginContext<&mut ApplyContext>, _options: &CompilerOptions) -> Result<()> {
    ctx
      .context
      .normal_module_factory_hooks
      .resolve_for_scheme
      .tap(resolve_for_scheme::new(self));
    ctx
      .context
      .normal_module_factory_hooks
      .resolve_in_scheme
      .tap(resolve_in_scheme::new(self));
    ctx
      .context
      .normal_module_hooks
      .read_resource
      .tap(read_resource::new(self));
    Ok(())
  }
}

#[derive(Debug)]
pub struct HttpUriOptionsAllowedUris {
  conditions: AssetConditions,
}

impl Default for HttpUriOptionsAllowedUris {
  fn default() -> Self {
    Self {
      conditions: AssetConditions::Multiple(vec![]),
    }
  }
}

impl HttpUriOptionsAllowedUris {
  pub fn new(uris: Vec<String>) -> Self {
    // Convert string URIs to AssetConditions
    let conditions = if uris.is_empty() {
      AssetConditions::Multiple(vec![])
    } else {
      AssetConditions::Multiple(uris.into_iter().map(AssetCondition::String).collect())
    };

    Self { conditions }
  }

  pub fn from_asset_conditions(conditions: AssetConditions) -> Self {
    Self { conditions }
  }

  pub fn is_allowed(&self, uri: &str) -> bool {
    // If conditions is empty, allow all
    if let AssetConditions::Multiple(conditions) = &self.conditions {
      if conditions.is_empty() {
        return true;
      }

      // Check each condition, similar to webpack's isAllowed function
      for condition in conditions {
        match condition {
          AssetCondition::String(s) => {
            // String conditions in webpack check if URI starts with the string
            if uri.starts_with(s) {
              return true;
            }
          }
          AssetCondition::Regexp(r) => {
            // Regex conditions in webpack test the URI against the regex
            if r.test(uri) {
              return true;
            }
          }
        }
      }

      return false;
    }

    // For single conditions, do the same check
    match &self.conditions {
      AssetConditions::Single(AssetCondition::String(s)) => uri.starts_with(s),
      AssetConditions::Single(AssetCondition::Regexp(r)) => r.test(uri),
      _ => false, // Should never reach here given the check above
    }
  }

  pub fn get_allowed_uris_description(&self) -> String {
    match &self.conditions {
      AssetConditions::Single(condition) => self.condition_to_string(condition),
      AssetConditions::Multiple(conditions) => {
        if conditions.is_empty() {
          return "All URIs are allowed".to_string();
        }

        conditions
          .iter()
          .map(|c| format!(" - {}", self.condition_to_string(c)))
          .collect::<Vec<_>>()
          .join("\n")
      }
    }
  }

  fn condition_to_string(&self, condition: &AssetCondition) -> String {
    match condition {
      AssetCondition::String(s) => s.to_string(),
      AssetCondition::Regexp(r) => r.to_source_string(),
    }
  }
}
