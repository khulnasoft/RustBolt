use rustbolt_collections::Identifier;
use rustbolt_core::{
  impl_runtime_module,
  rustbolt_sources::{BoxSource, RawStringSource, SourceExt},
  Compilation, RuntimeGlobals, RuntimeModule,
};

#[impl_runtime_module]
#[derive(Debug)]
pub struct AmdDefineRuntimeModule {
  id: Identifier,
}

impl Default for AmdDefineRuntimeModule {
  fn default() -> Self {
    Self::with_default(Identifier::from("webpack/runtime/amd_define"))
  }
}

#[async_trait::async_trait]
impl RuntimeModule for AmdDefineRuntimeModule {
  fn name(&self) -> Identifier {
    self.id
  }

  async fn generate(&self, _compilation: &Compilation) -> rustbolt_error::Result<BoxSource> {
    Ok(
      RawStringSource::from(format!(
        "{} = function () {{ throw new Error('define cannot be used indirect'); }}",
        RuntimeGlobals::AMD_DEFINE.name()
      ))
      .boxed(),
    )
  }
}
