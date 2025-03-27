use cow_utils::CowUtils;
use rustbolt_collections::Identifier;
use rustbolt_core::{
  impl_runtime_module,
  rustbolt_sources::{BoxSource, RawStringSource, SourceExt},
  Compilation, RuntimeModule, RuntimeModuleStage,
};

#[impl_runtime_module]
#[derive(Debug)]
pub struct RustboltUniqueIdRuntimeModule {
  id: Identifier,
  bundler_name: String,
  bundler_version: String,
}

impl RustboltUniqueIdRuntimeModule {
  pub fn new(bundler_name: String, bundler_version: String) -> Self {
    Self::with_default(
      Identifier::from("webpack/runtime/rustbolt_unique_id"),
      bundler_name,
      bundler_version,
    )
  }
}

#[async_trait::async_trait]
impl RuntimeModule for RustboltUniqueIdRuntimeModule {
  fn stage(&self) -> RuntimeModuleStage {
    RuntimeModuleStage::Attach
  }
  fn name(&self) -> Identifier {
    self.id
  }

  async fn generate(&self, _: &Compilation) -> rustbolt_error::Result<BoxSource> {
    Ok(
      RawStringSource::from(
        include_str!("runtime/get_unique_id.js")
          .cow_replace("$BUNDLER_NAME$", &self.bundler_name)
          .cow_replace("$BUNDLER_VERSION$", &self.bundler_version)
          .into_owned(),
      )
      .boxed(),
    )
  }
}
