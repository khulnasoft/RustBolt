mod ast;

pub use crate::ast::javascript;
use crate::ast::javascript::Ast as JsAst;

/**
 *  AST used in first class Module
 */
#[derive(Debug, Clone, Hash)]
pub enum RustboltAst {
  JavaScript(JsAst),
}

impl RustboltAst {
  pub fn as_javascript(&self) -> Option<&JsAst> {
    match self {
      RustboltAst::JavaScript(program) => Some(program),
    }
  }
}
