use std::sync::Arc;

use futures::future::BoxFuture;
use rustbolt_core::{Compilation, Module};
use rustbolt_error::Result;

pub struct CacheGroupTestFnCtx<'a> {
  pub compilation: &'a Compilation,
  pub module: &'a dyn Module,
}

type CacheGroupTestFn =
  Arc<dyn Fn(CacheGroupTestFnCtx<'_>) -> BoxFuture<'static, Result<Option<bool>>> + Send + Sync>;

#[derive(Clone)]
pub enum CacheGroupTest {
  String(String),
  Fn(CacheGroupTestFn),
  RegExp(rustbolt_regex::RustboltRegex),
  Enabled,
}
