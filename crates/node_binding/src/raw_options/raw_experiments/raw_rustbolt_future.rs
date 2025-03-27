use napi_derive::napi;
use rustbolt_core::RustboltFuture;

#[allow(clippy::empty_structs_with_brackets)]
#[derive(Debug, Default)]
#[napi(object)]
pub struct RawRustboltFuture {}

impl From<RawRustboltFuture> for RustboltFuture {
  fn from(_value: RawRustboltFuture) -> Self {
    Self {}
  }
}
