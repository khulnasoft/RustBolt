use rustbolt_collections::DatabaseItem;
use rustbolt_core::{ApplyContext, CompilationChunkIds, CompilerOptions, Plugin, PluginContext};
use rustbolt_error::Result;
use rustbolt_hook::{plugin, plugin_hook};
use rustc_hash::{FxBuildHasher, FxHashMap};

use crate::id_helpers::{
  assign_deterministic_ids, compare_chunks_natural, get_full_chunk_name, get_used_chunk_ids,
};

#[plugin]
#[derive(Debug, Default)]
pub struct DeterministicChunkIdsPlugin {
  pub delimiter: String,
  pub context: Option<String>,
}

impl DeterministicChunkIdsPlugin {
  pub fn new(delimiter: Option<String>, context: Option<String>) -> Self {
    Self::new_inner(delimiter.unwrap_or_else(|| "~".to_string()), context)
  }
}

#[plugin_hook(CompilationChunkIds for DeterministicChunkIdsPlugin)]
async fn chunk_ids(&self, compilation: &mut rustbolt_core::Compilation) -> rustbolt_error::Result<()> {
  let mut used_ids = get_used_chunk_ids(compilation);
  let used_ids_len = used_ids.len();

  let chunk_graph = &compilation.chunk_graph;
  let module_graph = compilation.get_module_graph();
  let context = self
    .context
    .clone()
    .unwrap_or_else(|| compilation.options.context.as_str().to_string());

  let max_length = 3;
  let expand_factor = 10;
  let salt = 10;

  let chunks = compilation
    .chunk_by_ukey
    .values()
    .filter(|chunk| chunk.id(&compilation.chunk_ids_artifact).is_none())
    .collect::<Vec<_>>();
  let mut chunk_key_to_id =
    FxHashMap::with_capacity_and_hasher(chunks.len(), FxBuildHasher::default());

  assign_deterministic_ids(
    chunks,
    |chunk| get_full_chunk_name(chunk, chunk_graph, &module_graph, &context),
    |a, b| {
      compare_chunks_natural(
        chunk_graph,
        &module_graph,
        &compilation.module_ids_artifact,
        a,
        b,
      )
    },
    |chunk, id| {
      let size = used_ids.len();
      used_ids.insert(id.to_string());
      if used_ids.len() == size {
        return false;
      }

      chunk_key_to_id.insert(chunk.ukey(), id);
      true
    },
    &[usize::pow(10, max_length)],
    expand_factor,
    used_ids_len,
    salt,
  );

  chunk_key_to_id.into_iter().for_each(|(chunk_ukey, id)| {
    let chunk = compilation.chunk_by_ukey.expect_get_mut(&chunk_ukey);
    chunk.set_id(&mut compilation.chunk_ids_artifact, id.to_string());
  });

  Ok(())
}

impl Plugin for DeterministicChunkIdsPlugin {
  fn apply(&self, ctx: PluginContext<&mut ApplyContext>, _options: &CompilerOptions) -> Result<()> {
    ctx
      .context
      .compilation_hooks
      .chunk_ids
      .tap(chunk_ids::new(self));
    Ok(())
  }
}
