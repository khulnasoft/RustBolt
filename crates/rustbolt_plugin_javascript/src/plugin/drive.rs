use rustbolt_core::{
  rustbolt_sources::BoxSource, BoxModule, Chunk, ChunkInitFragments, ChunkUkey, Compilation,
  ModuleIdentifier,
};
use rustbolt_hash::RustboltHash;
use rustbolt_hook::define_hook;

define_hook!(JavascriptModulesRenderChunk: AsyncSeries(compilation: &Compilation, chunk_ukey: &ChunkUkey, source: &mut RenderSource));
define_hook!(JavascriptModulesRender: AsyncSeries(compilation: &Compilation, chunk_ukey: &ChunkUkey, source: &mut RenderSource));
define_hook!(JavascriptModulesRenderStartup: AsyncSeries(compilation: &Compilation, chunk_ukey: &ChunkUkey, module: &ModuleIdentifier, source: &mut RenderSource));
define_hook!(JavascriptModulesRenderModuleContent: AsyncSeries(compilation: &Compilation, module: &BoxModule, source: &mut RenderSource, init_fragments: &mut ChunkInitFragments));
define_hook!(JavascriptModulesRenderModuleContainer: AsyncSeries(compilation: &Compilation, module: &BoxModule, source: &mut RenderSource, init_fragments: &mut ChunkInitFragments));
define_hook!(JavascriptModulesRenderModulePackage: AsyncSeries(compilation: &Compilation, chunk_ukey: &ChunkUkey, module: &BoxModule, source: &mut RenderSource, init_fragments: &mut ChunkInitFragments));
define_hook!(JavascriptModulesChunkHash: AsyncSeries(compilation: &Compilation, chunk_ukey: &ChunkUkey, hasher: &mut RustboltHash));
define_hook!(JavascriptModulesInlineInRuntimeBailout: SyncSeriesBail(compilation: &Compilation) -> String);
define_hook!(JavascriptModulesEmbedInRuntimeBailout: SyncSeriesBail(compilation: &Compilation, module: &BoxModule, chunk: &Chunk) -> String);
define_hook!(JavascriptModulesStrictRuntimeBailout: SyncSeriesBail(compilation: &Compilation, chunk_ukey: &ChunkUkey) -> String);

#[derive(Debug, Default)]
pub struct JavascriptModulesPluginHooks {
  pub render_chunk: JavascriptModulesRenderChunkHook,
  pub render: JavascriptModulesRenderHook,
  pub render_startup: JavascriptModulesRenderStartupHook,
  pub render_module_content: JavascriptModulesRenderModuleContentHook,
  pub render_module_container: JavascriptModulesRenderModuleContainerHook,
  pub render_module_package: JavascriptModulesRenderModulePackageHook,
  pub chunk_hash: JavascriptModulesChunkHashHook,
  pub inline_in_runtime_bailout: JavascriptModulesInlineInRuntimeBailoutHook,
  pub embed_in_runtime_bailout: JavascriptModulesEmbedInRuntimeBailoutHook,
  pub strict_runtime_bailout: JavascriptModulesStrictRuntimeBailoutHook,
}

#[derive(Debug)]
pub struct RenderSource {
  pub source: BoxSource,
}
