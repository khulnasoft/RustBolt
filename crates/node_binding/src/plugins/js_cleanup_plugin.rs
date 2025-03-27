use async_trait::async_trait;
use derive_more::Debug;
use napi::{bindgen_prelude::External, threadsafe_function::ThreadsafeFunction};
use rustbolt_collections::IdentifierSet;
use rustbolt_core::{
  ApplyContext, CompilationRevokedModules, CompilerOptions, ModuleIdentifier, PluginContext,
};
use rustbolt_hook::{plugin, plugin_hook};
use rustbolt_napi::NapiResultExt;

pub type CleanupRevokedModulesTsFn = ThreadsafeFunction<
  External<Vec<ModuleIdentifier>>,
  (),
  External<Vec<ModuleIdentifier>>,
  false,
  true,
  1,
>;

#[plugin]
#[derive(Debug)]
pub struct JsCleanupPlugin {
  #[debug(skip)]
  cleanup_revoked_modules: CleanupRevokedModulesTsFn,
}

impl JsCleanupPlugin {
  pub fn new(cleanup_revoked_modules: CleanupRevokedModulesTsFn) -> Self {
    Self::new_inner(cleanup_revoked_modules)
  }
}

#[async_trait]
impl rustbolt_core::Plugin for JsCleanupPlugin {
  fn name(&self) -> &'static str {
    "rustbolt.JsCleanupPlugin"
  }

  fn apply(
    &self,
    ctx: PluginContext<&mut ApplyContext>,
    _options: &CompilerOptions,
  ) -> rustbolt_error::Result<()> {
    ctx
      .context
      .compilation_hooks
      .revoked_modules
      .tap(revoked_modules::new(self));

    Ok(())
  }
}

#[plugin_hook(CompilationRevokedModules for JsCleanupPlugin)]
async fn revoked_modules(&self, revoked_modules: &IdentifierSet) -> rustbolt_error::Result<()> {
  self
    .cleanup_revoked_modules
    .call_async(External::new(
      revoked_modules.iter().cloned().collect::<Vec<_>>(),
    ))
    .await
    .into_rustbolt_result()?;
  Ok(())
}
