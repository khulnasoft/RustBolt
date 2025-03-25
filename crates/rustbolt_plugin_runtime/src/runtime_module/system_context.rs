use rustbolt_collections::Identifier;
use rustbolt_core::{
  impl_runtime_module,
  rustbolt_sources::{BoxSource, RawStringSource, SourceExt},
  Compilation, RuntimeGlobals, RuntimeModule,
};

#[impl_runtime_module]
#[derive(Debug)]
pub struct SystemContextRuntimeModule {
  id: Identifier,
}

impl Default for SystemContextRuntimeModule {
  fn default() -> Self {
    Self::with_default(Identifier::from("webpack/runtime/start_entry_point"))
  }
}

#[async_trait::async_trait]
impl RuntimeModule for SystemContextRuntimeModule {
  fn name(&self) -> Identifier {
    self.id
  }

  async fn generate(&self, _compilation: &Compilation) -> rustbolt_error::Result<BoxSource> {
    Ok(
      RawStringSource::from(format!(
        "{} = __system_context__",
        RuntimeGlobals::SYSTEM_CONTEXT
      ))
      .boxed(),
    )
  }
}
