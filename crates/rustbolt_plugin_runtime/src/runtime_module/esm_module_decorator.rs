use rustbolt_collections::Identifier;
use rustbolt_core::{
  impl_runtime_module,
  rustbolt_sources::{BoxSource, RawStringSource, SourceExt},
  Compilation, RuntimeModule,
};

#[impl_runtime_module]
#[derive(Debug)]
pub struct ESMModuleDecoratorRuntimeModule {
  id: Identifier,
}

impl Default for ESMModuleDecoratorRuntimeModule {
  fn default() -> Self {
    Self::with_default(Identifier::from("webpack/runtime/esm_module_decorator"))
  }
}

#[async_trait::async_trait]
impl RuntimeModule for ESMModuleDecoratorRuntimeModule {
  fn name(&self) -> Identifier {
    self.id
  }

  fn template(&self) -> Vec<(String, String)> {
    vec![(
      self.id.to_string(),
      include_str!("runtime/esm_module_decorator.ejs").to_string(),
    )]
  }

  async fn generate(&self, compilation: &Compilation) -> rustbolt_error::Result<BoxSource> {
    let source = compilation.runtime_template.render(&self.id, None)?;

    Ok(RawStringSource::from(source).boxed())
  }
}
