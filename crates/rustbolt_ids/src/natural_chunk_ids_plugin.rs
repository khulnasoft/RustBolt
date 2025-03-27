use itertools::Itertools;
use rustbolt_collections::DatabaseItem;
use rustbolt_core::{
  ApplyContext, Chunk, CompilationChunkIds, CompilerOptions, Plugin, PluginContext,
};
use rustbolt_hook::{plugin, plugin_hook};

use crate::id_helpers::{assign_ascending_chunk_ids, compare_chunks_natural};

#[plugin]
#[derive(Debug, Default)]
pub struct NaturalChunkIdsPlugin;

#[plugin_hook(CompilationChunkIds for NaturalChunkIdsPlugin)]
async fn chunk_ids(
  &self,
  compilation: &mut rustbolt_core::Compilation,
) -> rustbolt_error::Result<()> {
  let module_ids = &compilation.module_ids_artifact;
  let chunk_graph = &compilation.chunk_graph;
  let module_graph = &compilation.get_module_graph();

  let chunks = compilation
    .chunk_by_ukey
    .values()
    .map(|chunk| chunk as &Chunk)
    .sorted_unstable_by(|a, b| compare_chunks_natural(chunk_graph, module_graph, module_ids, a, b))
    .map(|chunk| chunk.ukey())
    .collect::<Vec<_>>();

  if !chunks.is_empty() {
    assign_ascending_chunk_ids(&chunks, compilation);
  }

  Ok(())
}

impl Plugin for NaturalChunkIdsPlugin {
  fn apply(
    &self,
    ctx: PluginContext<&mut ApplyContext>,
    _options: &CompilerOptions,
  ) -> rustbolt_error::Result<()> {
    ctx
      .context
      .compilation_hooks
      .chunk_ids
      .tap(chunk_ids::new(self));
    Ok(())
  }
}
