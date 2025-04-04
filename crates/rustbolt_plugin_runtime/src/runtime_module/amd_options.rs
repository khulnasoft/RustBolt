use rustbolt_collections::Identifier;
use rustbolt_core::{
  impl_runtime_module,
  rustbolt_sources::{BoxSource, RawStringSource, SourceExt},
  Compilation, RuntimeGlobals, RuntimeModule,
};

#[impl_runtime_module]
#[derive(Debug)]
pub struct AmdOptionsRuntimeModule {
  id: Identifier,
  options: String,
}

impl AmdOptionsRuntimeModule {
  pub fn new(options: String) -> Self {
    Self::with_default(Identifier::from("webpack/runtime/amd_options"), options)
  }
}

#[async_trait::async_trait]
impl RuntimeModule for AmdOptionsRuntimeModule {
  fn name(&self) -> Identifier {
    self.id
  }

  async fn generate(&self, _compilation: &Compilation) -> rustbolt_error::Result<BoxSource> {
    Ok(
      RawStringSource::from(format!(
        "{} = {}",
        RuntimeGlobals::AMD_OPTIONS.name(),
        self.options
      ))
      .boxed(),
    )
  }
}
