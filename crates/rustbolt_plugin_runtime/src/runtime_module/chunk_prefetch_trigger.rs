use std::hash::BuildHasherDefault;

use indexmap::IndexMap;
use rustbolt_cacheable::with::AsMap;
use rustbolt_collections::Identifier;
use rustbolt_core::{
  chunk_graph_chunk::ChunkId,
  impl_runtime_module,
  rustbolt_sources::{BoxSource, RawStringSource, SourceExt},
  Compilation, RuntimeModule, RuntimeModuleStage,
};
use rustc_hash::FxHasher;

#[impl_runtime_module]
#[derive(Debug)]
pub struct ChunkPrefetchTriggerRuntimeModule {
  id: Identifier,
  #[cacheable(with=AsMap)]
  chunk_map: IndexMap<ChunkId, Vec<ChunkId>, BuildHasherDefault<FxHasher>>,
}

impl ChunkPrefetchTriggerRuntimeModule {
  pub fn new(chunk_map: IndexMap<ChunkId, Vec<ChunkId>, BuildHasherDefault<FxHasher>>) -> Self {
    Self::with_default(
      Identifier::from("webpack/runtime/chunk_prefetch_trigger"),
      chunk_map,
    )
  }
}

#[async_trait::async_trait]
impl RuntimeModule for ChunkPrefetchTriggerRuntimeModule {
  fn name(&self) -> Identifier {
    self.id
  }

  fn template(&self) -> Vec<(String, String)> {
    vec![(
      self.id.to_string(),
      include_str!("runtime/chunk_prefetch_trigger.ejs").to_string(),
    )]
  }

  async fn generate(&self, compilation: &Compilation) -> rustbolt_error::Result<BoxSource> {
    let source = compilation.runtime_template.render(
      &self.id,
      Some(serde_json::json!({
        "CHUNK_MAP": &self.chunk_map,
      })),
    )?;
    Ok(RawStringSource::from(source).boxed())
  }

  fn stage(&self) -> RuntimeModuleStage {
    RuntimeModuleStage::Trigger
  }
}
