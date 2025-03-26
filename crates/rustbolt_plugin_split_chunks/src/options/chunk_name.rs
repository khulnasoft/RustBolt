use std::sync::Arc;

use futures::future::BoxFuture;
use rustbolt_core::{Chunk, Compilation, Module};
use rustbolt_error::Result;

pub struct ChunkNameGetterFnCtx<'a> {
  pub module: &'a dyn Module,
  pub compilation: &'a Compilation,
  pub chunks: &'a Vec<&'a Chunk>,
  pub cache_group_key: &'a str,
}

type ChunkNameGetterFn = Arc<
  dyn for<'a> Fn(ChunkNameGetterFnCtx<'a>) -> BoxFuture<'static, Result<Option<String>>>
    + Sync
    + Send,
>;

#[derive(Clone)]
pub enum ChunkNameGetter {
  String(String),
  Fn(ChunkNameGetterFn),
  Disabled,
}
