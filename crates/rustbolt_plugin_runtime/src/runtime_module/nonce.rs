use rustbolt_collections::Identifier;
use rustbolt_core::{
  impl_runtime_module,
  rustbolt_sources::{BoxSource, RawStringSource, SourceExt},
  Compilation, RuntimeGlobals, RuntimeModule,
};

#[impl_runtime_module]
#[derive(Debug)]
pub struct NonceRuntimeModule {
  id: Identifier,
}

impl Default for NonceRuntimeModule {
  fn default() -> Self {
    Self::with_default(Identifier::from("webpack/runtime/nonce"))
  }
}

#[async_trait::async_trait]
impl RuntimeModule for NonceRuntimeModule {
  fn name(&self) -> Identifier {
    self.id
  }

  async fn generate(&self, _: &Compilation) -> rustbolt_error::Result<BoxSource> {
    Ok(RawStringSource::from(format!("{} = undefined;", RuntimeGlobals::SCRIPT_NONCE)).boxed())
  }
}
