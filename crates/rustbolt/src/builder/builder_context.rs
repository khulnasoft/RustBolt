use enum_tag::EnumTag;
use rustbolt_core::{
  BoxPlugin, ChunkLoadingType, CompilerOptions, EntryOptions, ExternalItem, ExternalType,
  LibraryType, PluginExt as _, WasmLoadingType,
};

/// Options of builtin plugins
///
/// The order of this list is strictly ordered with respect to `rustboltOptionsApply`.
#[allow(clippy::enum_variant_names)]
#[derive(Debug, EnumTag)]
#[repr(u8)]
pub(super) enum BuiltinPluginOptions {
  // External handling plugins
  ExternalsPlugin((ExternalType, Vec<ExternalItem>)),
  NodeTargetPlugin,
  ElectronTargetPlugin(rustbolt_plugin_externals::ElectronTargetContext),
  HttpExternalsRustboltPlugin((bool /* css */, bool /* web_async */)),

  // Chunk format and loading plugins
  ChunkPrefetchPreloadPlugin,
  CommonJsChunkFormatPlugin,
  ArrayPushCallbackChunkFormatPlugin,
  ModuleChunkFormatPlugin,
  EnableChunkLoadingPlugin(ChunkLoadingType),
  EnableWasmLoadingPlugin(WasmLoadingType),

  // Runtime and error handling
  RuntimeChunkPlugin(rustbolt_plugin_runtime_chunk::RuntimeChunkOptions),
  NoEmitOnErrorsPlugin,

  // DevTool plugins
  SourceMapDevToolPlugin(rustbolt_plugin_devtool::SourceMapDevToolPluginOptions),
  EvalSourceMapDevToolPlugin(rustbolt_plugin_devtool::SourceMapDevToolPluginOptions),
  EvalDevToolModulePlugin(rustbolt_plugin_devtool::EvalDevToolModulePluginOptions),

  // Core module plugins
  JavascriptModulesPlugin,
  JsonModulesPlugin,
  AssetModulesPlugin,
  AsyncWebAssemblyModulesPlugin,
  CssModulesPlugin,

  // Entry and runtime plugins
  EntryPlugin((String /* entry request */, EntryOptions)),
  RuntimePlugin,
  // TODO: add bundler info plugin
  // BundlerInfoRustboltPlugin,

  // Core functionality plugins
  InferAsyncModulesPlugin,
  APIPlugin,
  DataUriPlugin,
  FileUriPlugin,

  // Optimization plugins
  EnsureChunkConditionsPlugin,
  MergeDuplicateChunksPlugin,
  SideEffectsFlagPlugin,
  FlagDependencyExportsPlugin,
  FlagDependencyUsagePlugin(bool),
  ModuleConcatenationPlugin,
  MangleExportsPlugin(bool),

  // Experiments
  // TODO: support lazy compilation
  // LazyCompilationPlugin,

  // Output plugins
  EnableLibraryPlugin(LibraryType),
  // TODO: support split chunks
  // SplitChunksPlugin,
  RemoveEmptyChunksPlugin,
  RealContentHashPlugin,

  // Module and chunk ID plugins
  NamedModuleIdsPlugin,
  NaturalModuleIdsPlugin,
  DeterministicModuleIdsPlugin,
  NaturalChunkIdsPlugin,
  NamedChunkIdsPlugin,
  DeterministicChunkIdsPlugin,
  OccurrenceChunkIdsPlugin(rustbolt_ids::OccurrenceChunkIdsPluginOptions),

  // Define and optimization plugins
  DefinePlugin(rustbolt_plugin_javascript::define_plugin::DefineValue),
  AnyMinimizerRustboltPlugin(BoxPlugin),

  // TODO: support performance
  // SizeLimitsPlugin,

  // Cache plugins
  // MemoryCachePlugin,

  // Worker plugins
  WorkerPlugin,
}

/// Context used to build plugins
#[derive(Default, Debug)]
pub struct BuilderContext {
  pub(super) plugins: Vec<BuiltinPluginOptions>,
}

impl BuilderContext {
  /// Take plugins from the context.
  ///
  /// The plugins are sorted by their tag.
  pub fn take_plugins(&mut self, compiler_options: &CompilerOptions) -> Vec<BoxPlugin> {
    self.plugins.sort_by_key(|p| p.tag());
    let mut plugins = Vec::new();
    self.plugins.drain(..).for_each(|plugin| match plugin {
      // External handling plugins
      BuiltinPluginOptions::ExternalsPlugin((external_type, externals)) => {
        plugins
          .push(rustbolt_plugin_externals::ExternalsPlugin::new(external_type, externals).boxed());
      }
      BuiltinPluginOptions::NodeTargetPlugin => {
        plugins.push(rustbolt_plugin_externals::node_target_plugin())
      }
      BuiltinPluginOptions::ElectronTargetPlugin(context) => {
        rustbolt_plugin_externals::electron_target_plugin(context, &mut plugins)
      }
      BuiltinPluginOptions::HttpExternalsRustboltPlugin((css, web_async)) => {
        plugins.push(rustbolt_plugin_externals::http_externals_rustbolt_plugin(
          css, web_async,
        ));
      }

      // Chunk format and loading plugins
      BuiltinPluginOptions::ChunkPrefetchPreloadPlugin => {
        plugins.push(rustbolt_plugin_runtime::ChunkPrefetchPreloadPlugin::default().boxed());
      }
      BuiltinPluginOptions::CommonJsChunkFormatPlugin => {
        plugins.push(rustbolt_plugin_runtime::CommonJsChunkFormatPlugin::default().boxed());
      }
      BuiltinPluginOptions::ArrayPushCallbackChunkFormatPlugin => {
        plugins.push(rustbolt_plugin_runtime::ArrayPushCallbackChunkFormatPlugin::default().boxed());
      }
      BuiltinPluginOptions::ModuleChunkFormatPlugin => {
        plugins.push(rustbolt_plugin_runtime::ModuleChunkFormatPlugin::default().boxed());
      }
      BuiltinPluginOptions::EnableChunkLoadingPlugin(chunk_loading_type) => {
        rustbolt_plugin_runtime::enable_chunk_loading_plugin(chunk_loading_type, &mut plugins);
      }
      BuiltinPluginOptions::EnableWasmLoadingPlugin(wasm_loading_type) => {
        plugins.push(rustbolt_plugin_wasm::enable_wasm_loading_plugin(
          wasm_loading_type,
        ));
      }

      // Runtime and error handling plugins
      BuiltinPluginOptions::RuntimeChunkPlugin(options) => {
        plugins.push(rustbolt_plugin_runtime_chunk::RuntimeChunkPlugin::new(options).boxed());
      }
      BuiltinPluginOptions::NoEmitOnErrorsPlugin => {
        plugins.push(rustbolt_plugin_no_emit_on_errors::NoEmitOnErrorsPlugin::default().boxed());
      }

      // DevTool plugins
      BuiltinPluginOptions::SourceMapDevToolPlugin(options) => {
        plugins.push(
          rustbolt_plugin_devtool::SourceMapDevToolModuleOptionsPlugin::new(
            rustbolt_plugin_devtool::SourceMapDevToolModuleOptionsPluginOptions {
              module: options.module,
              cheap: !options.columns,
            },
          )
          .boxed(),
        );
        plugins.push(rustbolt_plugin_devtool::SourceMapDevToolPlugin::new(options).boxed());
      }
      BuiltinPluginOptions::EvalSourceMapDevToolPlugin(options) => {
        plugins.push(
          rustbolt_plugin_devtool::SourceMapDevToolModuleOptionsPlugin::new(
            rustbolt_plugin_devtool::SourceMapDevToolModuleOptionsPluginOptions {
              module: options.module,
              cheap: !options.columns,
            },
          )
          .boxed(),
        );
        plugins.push(rustbolt_plugin_devtool::EvalSourceMapDevToolPlugin::new(options).boxed());
      }
      BuiltinPluginOptions::EvalDevToolModulePlugin(options) => {
        plugins.push(rustbolt_plugin_devtool::EvalDevToolModulePlugin::new(options).boxed());
      }

      // Core module plugins
      BuiltinPluginOptions::JavascriptModulesPlugin => {
        plugins.push(rustbolt_plugin_javascript::JsPlugin::default().boxed());
      }
      BuiltinPluginOptions::JsonModulesPlugin => {
        plugins.push(rustbolt_plugin_json::JsonPlugin.boxed());
      }
      BuiltinPluginOptions::AssetModulesPlugin => {
        plugins.push(rustbolt_plugin_asset::AssetPlugin::default().boxed());
      }
      BuiltinPluginOptions::AsyncWebAssemblyModulesPlugin => {
        plugins.push(rustbolt_plugin_wasm::AsyncWasmPlugin::default().boxed());
      }
      BuiltinPluginOptions::CssModulesPlugin => {
        plugins.push(rustbolt_plugin_css::CssPlugin::default().boxed());
      }

      // Entry and runtime plugins
      BuiltinPluginOptions::EntryPlugin((entry_request, options)) => {
        plugins.push(
          rustbolt_plugin_entry::EntryPlugin::new(
            compiler_options.context.clone(),
            entry_request,
            options,
          )
          .boxed(),
        );
      }
      BuiltinPluginOptions::RuntimePlugin => {
        plugins.push(rustbolt_plugin_runtime::RuntimePlugin::default().boxed())
      }
      // TODO: add bundler info plugin
      // BuiltinPluginOptions::BundlerInfoRustboltPlugin => {}

      // Core functionality plugins
      BuiltinPluginOptions::InferAsyncModulesPlugin => {
        plugins.push(rustbolt_plugin_javascript::InferAsyncModulesPlugin::default().boxed())
      }
      BuiltinPluginOptions::APIPlugin => {
        plugins.push(rustbolt_plugin_javascript::api_plugin::APIPlugin::default().boxed())
      }
      BuiltinPluginOptions::DataUriPlugin => {
        plugins.push(rustbolt_plugin_schemes::DataUriPlugin::default().boxed());
      }
      BuiltinPluginOptions::FileUriPlugin => {
        plugins.push(rustbolt_plugin_schemes::FileUriPlugin::default().boxed());
      }

      // Optimization plugins
      BuiltinPluginOptions::EnsureChunkConditionsPlugin => {
        plugins.push(
          rustbolt_plugin_ensure_chunk_conditions::EnsureChunkConditionsPlugin::default().boxed(),
        );
      }
      BuiltinPluginOptions::MergeDuplicateChunksPlugin => {
        plugins.push(
          rustbolt_plugin_merge_duplicate_chunks::MergeDuplicateChunksPlugin::default().boxed(),
        );
      }
      BuiltinPluginOptions::SideEffectsFlagPlugin => {
        plugins.push(rustbolt_plugin_javascript::SideEffectsFlagPlugin::default().boxed());
      }
      BuiltinPluginOptions::FlagDependencyExportsPlugin => {
        plugins.push(rustbolt_plugin_javascript::FlagDependencyExportsPlugin::default().boxed());
      }
      BuiltinPluginOptions::FlagDependencyUsagePlugin(value) => {
        plugins.push(rustbolt_plugin_javascript::FlagDependencyUsagePlugin::new(value).boxed())
      }
      BuiltinPluginOptions::ModuleConcatenationPlugin => {
        plugins.push(rustbolt_plugin_javascript::ModuleConcatenationPlugin::default().boxed());
      }
      BuiltinPluginOptions::MangleExportsPlugin(value) => {
        plugins.push(rustbolt_plugin_javascript::MangleExportsPlugin::new(value).boxed())
      }

      // Experiments
      // TODO: support lazy compilation
      // BuiltinPluginOptions::LazyCompilationPlugin => {
      // plugins
      // .push(rustbolt_plugin_lazy_compilation::plugin::LazyCompilationPlugin::default().boxed());
      // }

      // Output plugins
      BuiltinPluginOptions::EnableLibraryPlugin(library_type) => {
        rustbolt_plugin_library::enable_library_plugin(library_type, &mut plugins)
      }
      // BuiltinPluginOptions::SplitChunksPlugin => {
      // plugins.push(rustbolt_plugin_split_chunks::SplitChunksPlugin::default().boxed())
      // }
      BuiltinPluginOptions::RemoveEmptyChunksPlugin => {
        plugins.push(rustbolt_plugin_remove_empty_chunks::RemoveEmptyChunksPlugin::default().boxed())
      }
      BuiltinPluginOptions::RealContentHashPlugin => {
        plugins.push(rustbolt_plugin_real_content_hash::RealContentHashPlugin::default().boxed())
      }
      // Module and chunk ID plugins
      BuiltinPluginOptions::NamedModuleIdsPlugin => {
        plugins.push(rustbolt_ids::NamedModuleIdsPlugin::default().boxed())
      }
      BuiltinPluginOptions::NaturalModuleIdsPlugin => {
        plugins.push(rustbolt_ids::NaturalModuleIdsPlugin::default().boxed())
      }
      BuiltinPluginOptions::DeterministicModuleIdsPlugin => {
        plugins.push(rustbolt_ids::DeterministicModuleIdsPlugin::default().boxed())
      }
      BuiltinPluginOptions::NaturalChunkIdsPlugin => {
        plugins.push(rustbolt_ids::NaturalChunkIdsPlugin::default().boxed())
      }
      BuiltinPluginOptions::NamedChunkIdsPlugin => {
        plugins.push(rustbolt_ids::NamedChunkIdsPlugin::new(None, None).boxed())
      }
      BuiltinPluginOptions::DeterministicChunkIdsPlugin => {
        plugins.push(rustbolt_ids::DeterministicChunkIdsPlugin::default().boxed())
      }
      BuiltinPluginOptions::OccurrenceChunkIdsPlugin(options) => {
        plugins.push(rustbolt_ids::OccurrenceChunkIdsPlugin::new(options).boxed())
      }

      // Define and optimization plugins
      BuiltinPluginOptions::DefinePlugin(values) => {
        plugins.push(rustbolt_plugin_javascript::define_plugin::DefinePlugin::new(values).boxed())
      }
      BuiltinPluginOptions::AnyMinimizerRustboltPlugin(plugin) => plugins.push(plugin),

      // TODO: support performance
      // BuiltinPluginOptions::SizeLimitsPlugin => {
      // plugins.push(rustbolt_plugin_size_limits::SizeLimitsPlugin::default().boxed())
      // }

      // Cache plugins
      // BuiltinPluginOptions::MemoryCachePlugin => MemoryCachePlugin::default().boxed(),

      // Worker plugins
      BuiltinPluginOptions::WorkerPlugin => {
        plugins.push(rustbolt_plugin_worker::WorkerPlugin::default().boxed())
      }
    });
    plugins
  }
}
