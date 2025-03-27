use napi_derive::napi;
use rustbolt_error::{miette, Diagnostic, Result, RustboltSeverity};

#[napi(object)]
pub struct JsRustboltDiagnostic {
  pub severity: JsRustboltSeverity,
  pub error: JsRustboltError,
}

impl From<JsRustboltDiagnostic> for Diagnostic {
  fn from(value: JsRustboltDiagnostic) -> Self {
    value.error.into_diagnostic(value.severity.into())
  }
}

#[napi(string_enum)]
pub enum JsRustboltSeverity {
  Error,
  Warn,
}

impl From<JsRustboltSeverity> for RustboltSeverity {
  fn from(value: JsRustboltSeverity) -> Self {
    match value {
      JsRustboltSeverity::Error => RustboltSeverity::Error,
      JsRustboltSeverity::Warn => RustboltSeverity::Warn,
    }
  }
}

impl From<JsRustboltSeverity> for miette::Severity {
  fn from(value: JsRustboltSeverity) -> Self {
    match value {
      JsRustboltSeverity::Error => miette::Severity::Error,
      JsRustboltSeverity::Warn => miette::Severity::Warning,
    }
  }
}

#[napi(object)]
#[derive(Debug)]
pub struct JsRustboltError {
  pub name: String,
  pub message: String,
  pub module_identifier: Option<String>,
  pub loc: Option<String>,
  pub file: Option<String>,
  pub stack: Option<String>,
  pub hide_stack: Option<bool>,
}

impl JsRustboltError {
  pub fn try_from_diagnostic(diagnostic: &Diagnostic, colored: bool) -> Result<Self> {
    Ok(Self {
      name: diagnostic.code().map(|n| n.to_string()).unwrap_or_else(|| {
        match diagnostic.severity() {
          rustbolt_error::RustboltSeverity::Error => "Error".to_string(),
          rustbolt_error::RustboltSeverity::Warn => "Warn".to_string(),
        }
      }),
      message: diagnostic.render_report(colored)?,
      module_identifier: diagnostic.module_identifier().map(|d| d.to_string()),
      loc: diagnostic.loc(),
      file: diagnostic.file().map(|f| f.as_str().to_string()),
      stack: diagnostic.stack(),
      hide_stack: diagnostic.hide_stack(),
    })
  }

  pub fn into_diagnostic(self, severity: RustboltSeverity) -> Diagnostic {
    (match severity {
      RustboltSeverity::Error => Diagnostic::error,
      RustboltSeverity::Warn => Diagnostic::warn,
    })(self.name, self.message)
    .with_file(self.file.map(Into::into))
    .with_module_identifier(self.module_identifier.map(Into::into))
    .with_stack(self.stack)
    .with_hide_stack(self.hide_stack)
  }
}
