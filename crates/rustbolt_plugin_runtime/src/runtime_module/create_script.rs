use rustbolt_collections::Identifier;
use rustbolt_core::{
  impl_runtime_module,
  rustbolt_sources::{BoxSource, RawStringSource, SourceExt},
  Compilation, RuntimeGlobals, RuntimeModule,
};

#[impl_runtime_module]
#[derive(Debug)]
pub struct CreateScriptRuntimeModule {
  id: Identifier,
}

impl Default for CreateScriptRuntimeModule {
  fn default() -> Self {
    Self::with_default(Identifier::from("webpack/runtime/create_script"))
  }
}

#[async_trait::async_trait]
impl RuntimeModule for CreateScriptRuntimeModule {
  fn name(&self) -> Identifier {
    self.id
  }

  fn template(&self) -> Vec<(String, String)> {
    vec![(
      self.id.to_string(),
      include_str!("runtime/create_script.ejs").to_string(),
    )]
  }

  async fn generate(&self, compilation: &Compilation) -> rustbolt_error::Result<BoxSource> {
    let source = compilation.runtime_template.render(
      &self.id,
      Some(serde_json::json!({
        "_return": if compilation.options.output.trusted_types.is_some() {
          format!(
            "{}().createScript(script)",
            RuntimeGlobals::GET_TRUSTED_TYPES_POLICY
          )
        } else {
          "script".to_string()
        },
      })),
    )?;

    Ok(RawStringSource::from(source).boxed())
  }
}
