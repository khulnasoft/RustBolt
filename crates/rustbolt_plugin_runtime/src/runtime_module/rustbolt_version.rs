use rustbolt_collections::Identifier;
use rustbolt_core::{
  impl_runtime_module,
  rustbolt_sources::{BoxSource, RawStringSource, SourceExt},
  Compilation, RuntimeModule,
};

#[impl_runtime_module]
#[derive(Debug)]
pub struct RustboltVersionRuntimeModule {
  id: Identifier,
  version: String,
}

impl RustboltVersionRuntimeModule {
  pub fn new(version: String) -> Self {
    Self::with_default(
      Identifier::from("webpack/runtime/rustbolt_version"),
      version,
    )
  }
}

#[async_trait::async_trait]
impl RuntimeModule for RustboltVersionRuntimeModule {
  fn name(&self) -> Identifier {
    self.id
  }

  fn template(&self) -> Vec<(String, String)> {
    vec![(
      self.id.to_string(),
      include_str!("runtime/get_version.ejs").to_string(),
    )]
  }

  async fn generate(&self, compilation: &Compilation) -> rustbolt_error::Result<BoxSource> {
    let source = compilation.runtime_template.render(
      &self.id,
      Some(serde_json::json!({
        "_version": format!("\"{}\"", &self.version),
      })),
    )?;

    Ok(RawStringSource::from(source).boxed())
  }
}
