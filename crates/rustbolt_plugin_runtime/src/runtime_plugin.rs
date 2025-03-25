use std::{hash::Hash, sync::LazyLock};

use async_trait::async_trait;
use rustbolt_collections::DatabaseItem;
use rustbolt_core::{
  get_css_chunk_filename_template, get_js_chunk_filename_template, has_hash_placeholder,
  ApplyContext, ChunkLoading, ChunkUkey, Compilation, CompilationId, CompilationParams,
  CompilationRuntimeRequirementInModule, CompilationRuntimeRequirementInTree, CompilerCompilation,
  CompilerOptions, ModuleIdentifier, Plugin, PluginContext, PublicPath, RuntimeGlobals,
  RuntimeModuleExt, SourceType,
};
use rustbolt_error::Result;
use rustbolt_hash::RustboltHash;
use rustbolt_hook::{plugin, plugin_hook};
use rustbolt_plugin_javascript::{JavascriptModulesChunkHash, JsPlugin};
use rustbolt_util::fx_hash::FxDashMap;

use crate::{
  runtime_module::{
    chunk_has_css, chunk_has_js, is_enabled_for_chunk, AmdDefineRuntimeModule,
    AmdOptionsRuntimeModule, AsyncRuntimeModule, AutoPublicPathRuntimeModule, BaseUriRuntimeModule,
    ChunkNameRuntimeModule, ChunkPrefetchPreloadFunctionRuntimeModule,
    CompatGetDefaultExportRuntimeModule, CreateFakeNamespaceObjectRuntimeModule,
    CreateScriptRuntimeModule, CreateScriptUrlRuntimeModule, DefinePropertyGettersRuntimeModule,
    ESMModuleDecoratorRuntimeModule, EnsureChunkRuntimeModule, GetChunkFilenameRuntimeModule,
    GetChunkUpdateFilenameRuntimeModule, GetFullHashRuntimeModule, GetMainFilenameRuntimeModule,
    GetTrustedTypesPolicyRuntimeModule, GlobalRuntimeModule, HasOwnPropertyRuntimeModule,
    LoadScriptRuntimeModule, MakeNamespaceObjectRuntimeModule, NodeModuleDecoratorRuntimeModule,
    NonceRuntimeModule, OnChunkLoadedRuntimeModule, PublicPathRuntimeModule,
    RelativeUrlRuntimeModule, RuntimeIdRuntimeModule, SystemContextRuntimeModule,
  },
  RuntimePluginHooks,
};

static COMPILATION_HOOKS_MAP: LazyLock<FxDashMap<CompilationId, Box<RuntimePluginHooks>>> =
  LazyLock::new(Default::default);

static GLOBALS_ON_REQUIRE: LazyLock<Vec<RuntimeGlobals>> = LazyLock::new(|| {
  vec![
    RuntimeGlobals::CHUNK_NAME,
    RuntimeGlobals::RUNTIME_ID,
    RuntimeGlobals::COMPAT_GET_DEFAULT_EXPORT,
    RuntimeGlobals::CREATE_FAKE_NAMESPACE_OBJECT,
    RuntimeGlobals::CREATE_SCRIPT,
    RuntimeGlobals::CREATE_SCRIPT_URL,
    RuntimeGlobals::GET_TRUSTED_TYPES_POLICY,
    RuntimeGlobals::DEFINE_PROPERTY_GETTERS,
    RuntimeGlobals::ENSURE_CHUNK,
    RuntimeGlobals::ENTRY_MODULE_ID,
    RuntimeGlobals::GET_FULL_HASH,
    RuntimeGlobals::GLOBAL,
    RuntimeGlobals::MAKE_NAMESPACE_OBJECT,
    RuntimeGlobals::MODULE_CACHE,
    RuntimeGlobals::MODULE_FACTORIES,
    RuntimeGlobals::MODULE_FACTORIES_ADD_ONLY,
    RuntimeGlobals::INTERCEPT_MODULE_EXECUTION,
    RuntimeGlobals::PUBLIC_PATH,
    RuntimeGlobals::BASE_URI,
    RuntimeGlobals::RELATIVE_URL,
    RuntimeGlobals::SCRIPT_NONCE,
    RuntimeGlobals::UNCAUGHT_ERROR_HANDLER,
    RuntimeGlobals::ASYNC_MODULE,
    // RuntimeGlobals::WASM_INSTANCES,
    RuntimeGlobals::INSTANTIATE_WASM,
    RuntimeGlobals::SHARE_SCOPE_MAP,
    RuntimeGlobals::INITIALIZE_SHARING,
    RuntimeGlobals::LOAD_SCRIPT,
    RuntimeGlobals::SYSTEM_CONTEXT,
    RuntimeGlobals::ON_CHUNKS_LOADED,
  ]
});

static MODULE_DEPENDENCIES: LazyLock<Vec<(RuntimeGlobals, Vec<RuntimeGlobals>)>> =
  LazyLock::new(|| {
    vec![
      (RuntimeGlobals::MODULE_LOADED, vec![RuntimeGlobals::MODULE]),
      (RuntimeGlobals::MODULE_ID, vec![RuntimeGlobals::MODULE]),
      (
        RuntimeGlobals::ESM_MODULE_DECORATOR,
        vec![RuntimeGlobals::MODULE, RuntimeGlobals::REQUIRE_SCOPE],
      ),
      (
        RuntimeGlobals::NODE_MODULE_DECORATOR,
        vec![RuntimeGlobals::MODULE, RuntimeGlobals::REQUIRE_SCOPE],
      ),
      (RuntimeGlobals::AMD_DEFINE, vec![RuntimeGlobals::REQUIRE]),
      (
        RuntimeGlobals::AMD_OPTIONS,
        vec![RuntimeGlobals::REQUIRE_SCOPE],
      ),
    ]
  });

static TREE_DEPENDENCIES: LazyLock<Vec<(RuntimeGlobals, Vec<RuntimeGlobals>)>> =
  LazyLock::new(|| {
    vec![
      (
        RuntimeGlobals::COMPAT_GET_DEFAULT_EXPORT,
        vec![RuntimeGlobals::DEFINE_PROPERTY_GETTERS],
      ),
      (
        RuntimeGlobals::CREATE_FAKE_NAMESPACE_OBJECT,
        vec![
          RuntimeGlobals::DEFINE_PROPERTY_GETTERS,
          RuntimeGlobals::MAKE_NAMESPACE_OBJECT,
          RuntimeGlobals::REQUIRE,
        ],
      ),
      (
        RuntimeGlobals::DEFINE_PROPERTY_GETTERS,
        vec![RuntimeGlobals::HAS_OWN_PROPERTY],
      ),
      (
        RuntimeGlobals::INITIALIZE_SHARING,
        vec![RuntimeGlobals::SHARE_SCOPE_MAP],
      ),
      (
        RuntimeGlobals::SHARE_SCOPE_MAP,
        vec![RuntimeGlobals::HAS_OWN_PROPERTY],
      ),
      (
        RuntimeGlobals::ESM_MODULE_DECORATOR,
        vec![RuntimeGlobals::MODULE, RuntimeGlobals::REQUIRE_SCOPE],
      ),
      (
        RuntimeGlobals::NODE_MODULE_DECORATOR,
        vec![RuntimeGlobals::MODULE, RuntimeGlobals::REQUIRE_SCOPE],
      ),
    ]
  });

fn handle_require_scope_globals(
  runtime_requirements: &RuntimeGlobals,
  runtime_requirements_mut: &mut RuntimeGlobals,
) {
  if GLOBALS_ON_REQUIRE
    .iter()
    .any(|requirement| runtime_requirements.contains(*requirement))
  {
    runtime_requirements_mut.insert(RuntimeGlobals::REQUIRE_SCOPE);
  }
}

fn handle_dependency_globals(
  runtime_requirements: &RuntimeGlobals,
  runtime_requirements_mut: &mut RuntimeGlobals,
  dependencies: &[(RuntimeGlobals, Vec<RuntimeGlobals>)],
) {
  for (requirement, dependencies) in dependencies.iter() {
    if runtime_requirements.contains(*requirement) {
      runtime_requirements_mut.extend(dependencies.clone());
    }
  }
}

#[plugin]
#[derive(Debug, Default)]
pub struct RuntimePlugin;

impl RuntimePlugin {
  pub fn get_compilation_hooks(
    id: CompilationId,
  ) -> dashmap::mapref::one::Ref<'static, CompilationId, Box<RuntimePluginHooks>> {
    if !COMPILATION_HOOKS_MAP.contains_key(&id) {
      COMPILATION_HOOKS_MAP.insert(id, Default::default());
    }
    COMPILATION_HOOKS_MAP
      .get(&id)
      .expect("should have js plugin drive")
  }

  pub fn get_compilation_hooks_mut(
    id: CompilationId,
  ) -> dashmap::mapref::one::RefMut<'static, CompilationId, Box<RuntimePluginHooks>> {
    COMPILATION_HOOKS_MAP.entry(id).or_default()
  }
}

#[plugin_hook(CompilerCompilation for RuntimePlugin)]
async fn compilation(
  &self,
  compilation: &mut Compilation,
  _params: &mut CompilationParams,
) -> Result<()> {
  let mut hooks = JsPlugin::get_compilation_hooks_mut(compilation.id());
  hooks.chunk_hash.tap(js_chunk_hash::new(self));
  Ok(())
}

#[plugin_hook(JavascriptModulesChunkHash for RuntimePlugin)]
async fn js_chunk_hash(
  &self,
  compilation: &Compilation,
  chunk_ukey: &ChunkUkey,
  hasher: &mut RustboltHash,
) -> Result<()> {
  for identifier in compilation
    .chunk_graph
    .get_chunk_runtime_modules_iterable(chunk_ukey)
  {
    if let Some(hash) = compilation.runtime_modules_hash.get(identifier) {
      hash.hash(hasher);
    }
  }
  Ok(())
}

#[plugin_hook(CompilationRuntimeRequirementInModule for RuntimePlugin)]
async fn runtime_requirements_in_module(
  &self,
  _compilation: &Compilation,
  _module: &ModuleIdentifier,
  _all_runtime_requirements: &RuntimeGlobals,
  runtime_requirements: &RuntimeGlobals,
  runtime_requirements_mut: &mut RuntimeGlobals,
) -> Result<Option<()>> {
  handle_require_scope_globals(runtime_requirements, runtime_requirements_mut);
  handle_dependency_globals(
    runtime_requirements,
    runtime_requirements_mut,
    &MODULE_DEPENDENCIES,
  );

  Ok(None)
}

#[plugin_hook(CompilationRuntimeRequirementInTree for RuntimePlugin)]
async fn runtime_requirements_in_tree(
  &self,
  compilation: &mut Compilation,
  chunk_ukey: &ChunkUkey,
  _all_runtime_requirements: &RuntimeGlobals,
  runtime_requirements: &RuntimeGlobals,
  runtime_requirements_mut: &mut RuntimeGlobals,
) -> Result<Option<()>> {
  if compilation.options.output.trusted_types.is_some() {
    if runtime_requirements.contains(RuntimeGlobals::LOAD_SCRIPT) {
      runtime_requirements_mut.insert(RuntimeGlobals::CREATE_SCRIPT_URL);
    }
    if runtime_requirements.contains(RuntimeGlobals::CREATE_SCRIPT)
      || runtime_requirements.contains(RuntimeGlobals::CREATE_SCRIPT_URL)
    {
      runtime_requirements_mut.insert(RuntimeGlobals::GET_TRUSTED_TYPES_POLICY);
    }
  }

  if (runtime_requirements.contains(RuntimeGlobals::GET_CHUNK_UPDATE_SCRIPT_FILENAME)
    && has_hash_placeholder(
      compilation
        .options
        .output
        .hot_update_chunk_filename
        .as_str(),
    ))
    || (runtime_requirements.contains(RuntimeGlobals::GET_UPDATE_MANIFEST_FILENAME)
      && has_hash_placeholder(compilation.options.output.hot_update_main_filename.as_str()))
  {
    runtime_requirements_mut.insert(RuntimeGlobals::GET_FULL_HASH);
  }

  handle_require_scope_globals(runtime_requirements, runtime_requirements_mut);
  handle_dependency_globals(
    runtime_requirements,
    runtime_requirements_mut,
    &TREE_DEPENDENCIES,
  );

  let public_path = compilation
    .chunk_by_ukey
    .expect_get(chunk_ukey)
    .get_entry_options(&compilation.chunk_group_by_ukey)
    .and_then(|options| options.public_path.clone())
    .unwrap_or_else(|| compilation.options.output.public_path.clone());

  // TODO check output.scriptType
  if matches!(public_path, PublicPath::Auto)
    && runtime_requirements.contains(RuntimeGlobals::PUBLIC_PATH)
  {
    runtime_requirements_mut.insert(RuntimeGlobals::GLOBAL);
  }

  if runtime_requirements.contains(RuntimeGlobals::GET_CHUNK_SCRIPT_FILENAME)
    && matches!(compilation.options.output.chunk_filename.template(), Some(template) if has_hash_placeholder(template))
  {
    runtime_requirements_mut.insert(RuntimeGlobals::GET_FULL_HASH);
  }

  if runtime_requirements.contains(RuntimeGlobals::GET_CHUNK_CSS_FILENAME)
    && matches!(compilation.options.output.css_chunk_filename.template(), Some(template) if has_hash_placeholder(template))
  {
    runtime_requirements_mut.insert(RuntimeGlobals::GET_FULL_HASH);
  }

  if runtime_requirements.contains(RuntimeGlobals::PREFETCH_CHUNK) {
    runtime_requirements_mut.insert(RuntimeGlobals::PREFETCH_CHUNK_HANDLERS);
  }

  if runtime_requirements.contains(RuntimeGlobals::PRELOAD_CHUNK) {
    runtime_requirements_mut.insert(RuntimeGlobals::PRELOAD_CHUNK_HANDLERS);
  }

  if runtime_requirements.contains(RuntimeGlobals::ENSURE_CHUNK) {
    let c = compilation.chunk_by_ukey.expect_get(chunk_ukey);
    let has_async_chunks = c.has_async_chunks(&compilation.chunk_group_by_ukey);
    if has_async_chunks {
      runtime_requirements_mut.insert(RuntimeGlobals::ENSURE_CHUNK_HANDLERS);
    }
    compilation.add_runtime_module(chunk_ukey, EnsureChunkRuntimeModule::default().boxed())?;
  }

  if runtime_requirements.contains(RuntimeGlobals::ENSURE_CHUNK_INCLUDE_ENTRIES) {
    runtime_requirements_mut.insert(RuntimeGlobals::ENSURE_CHUNK_HANDLERS);
  }

  let library_type = {
    let chunk = compilation.chunk_by_ukey.expect_get(chunk_ukey);
    chunk
      .get_entry_options(&compilation.chunk_group_by_ukey)
      .and_then(|options| options.library.as_ref())
      .or(compilation.options.output.library.as_ref())
      .map(|library| library.library_type.clone())
  };

  for runtime_requirement in runtime_requirements.iter() {
    match runtime_requirement {
      RuntimeGlobals::ASYNC_MODULE => {
        compilation.add_runtime_module(chunk_ukey, AsyncRuntimeModule::default().boxed())?;
      }
      RuntimeGlobals::BASE_URI
        if is_enabled_for_chunk(chunk_ukey, &ChunkLoading::Disable, compilation) =>
      {
        compilation.add_runtime_module(chunk_ukey, BaseUriRuntimeModule::default().boxed())?;
      }
      RuntimeGlobals::PUBLIC_PATH => match &public_path {
        PublicPath::Filename(filename) => {
          compilation.add_runtime_module(
            chunk_ukey,
            PublicPathRuntimeModule::new(Box::new(filename.clone())).boxed(),
          )?;
        }
        PublicPath::Auto => {
          compilation
            .add_runtime_module(chunk_ukey, AutoPublicPathRuntimeModule::default().boxed())?;
        }
      },
      RuntimeGlobals::GET_CHUNK_SCRIPT_FILENAME => {
        compilation.add_runtime_module(
          chunk_ukey,
          GetChunkFilenameRuntimeModule::new(
            "javascript",
            "javascript",
            SourceType::JavaScript,
            RuntimeGlobals::GET_CHUNK_SCRIPT_FILENAME.to_string(),
            |_| false,
            |chunk, compilation| {
              chunk_has_js(&chunk.ukey(), compilation).then(|| {
                get_js_chunk_filename_template(
                  chunk,
                  &compilation.options.output,
                  &compilation.chunk_group_by_ukey,
                )
                .clone()
              })
            },
          )
          .boxed(),
        )?;
      }
      RuntimeGlobals::GET_CHUNK_CSS_FILENAME => {
        compilation.add_runtime_module(
          chunk_ukey,
          GetChunkFilenameRuntimeModule::new(
            "css",
            "css",
            SourceType::Css,
            RuntimeGlobals::GET_CHUNK_CSS_FILENAME.to_string(),
            |runtime_requirements| {
              runtime_requirements.contains(RuntimeGlobals::HMR_DOWNLOAD_UPDATE_HANDLERS)
            },
            |chunk, compilation| {
              chunk_has_css(&chunk.ukey(), compilation).then(|| {
                get_css_chunk_filename_template(
                  chunk,
                  &compilation.options.output,
                  &compilation.chunk_group_by_ukey,
                )
                .clone()
              })
            },
          )
          .boxed(),
        )?;
      }
      RuntimeGlobals::GET_CHUNK_UPDATE_SCRIPT_FILENAME => {
        compilation.add_runtime_module(
          chunk_ukey,
          GetChunkUpdateFilenameRuntimeModule::default().boxed(),
        )?;
      }
      RuntimeGlobals::GET_UPDATE_MANIFEST_FILENAME => {
        compilation.add_runtime_module(
          chunk_ukey,
          GetMainFilenameRuntimeModule::new(
            "update manifest",
            RuntimeGlobals::GET_UPDATE_MANIFEST_FILENAME,
            compilation
              .options
              .output
              .hot_update_main_filename
              .clone()
              .into(),
          )
          .boxed(),
        )?;
      }
      RuntimeGlobals::LOAD_SCRIPT => {
        compilation.add_runtime_module(
          chunk_ukey,
          LoadScriptRuntimeModule::new(
            compilation.options.output.unique_name.clone(),
            compilation.options.output.trusted_types.is_some(),
            *chunk_ukey,
          )
          .boxed(),
        )?;
      }
      RuntimeGlobals::HAS_OWN_PROPERTY => {
        compilation
          .add_runtime_module(chunk_ukey, HasOwnPropertyRuntimeModule::default().boxed())?;
      }
      RuntimeGlobals::GET_FULL_HASH => {
        compilation.add_runtime_module(chunk_ukey, GetFullHashRuntimeModule::default().boxed())?;
      }
      RuntimeGlobals::GLOBAL => {
        compilation.add_runtime_module(chunk_ukey, GlobalRuntimeModule::default().boxed())?;
      }
      RuntimeGlobals::CREATE_SCRIPT_URL => {
        compilation
          .add_runtime_module(chunk_ukey, CreateScriptUrlRuntimeModule::default().boxed())?;
      }
      RuntimeGlobals::CREATE_SCRIPT => {
        compilation.add_runtime_module(chunk_ukey, CreateScriptRuntimeModule::default().boxed())?;
      }
      RuntimeGlobals::ON_CHUNKS_LOADED => {
        compilation
          .add_runtime_module(chunk_ukey, OnChunkLoadedRuntimeModule::default().boxed())?;
      }
      RuntimeGlobals::DEFINE_PROPERTY_GETTERS => {
        compilation.add_runtime_module(
          chunk_ukey,
          DefinePropertyGettersRuntimeModule::default().boxed(),
        )?;
      }
      RuntimeGlobals::GET_TRUSTED_TYPES_POLICY => {
        compilation.add_runtime_module(
          chunk_ukey,
          Box::<GetTrustedTypesPolicyRuntimeModule>::default(),
        )?;
      }
      RuntimeGlobals::CREATE_FAKE_NAMESPACE_OBJECT => {
        compilation.add_runtime_module(
          chunk_ukey,
          CreateFakeNamespaceObjectRuntimeModule::default().boxed(),
        )?;
      }
      RuntimeGlobals::MAKE_NAMESPACE_OBJECT => {
        compilation.add_runtime_module(
          chunk_ukey,
          MakeNamespaceObjectRuntimeModule::default().boxed(),
        )?;
      }
      RuntimeGlobals::COMPAT_GET_DEFAULT_EXPORT => {
        compilation.add_runtime_module(
          chunk_ukey,
          CompatGetDefaultExportRuntimeModule::default().boxed(),
        )?;
      }
      RuntimeGlobals::ESM_MODULE_DECORATOR => {
        compilation.add_runtime_module(
          chunk_ukey,
          ESMModuleDecoratorRuntimeModule::default().boxed(),
        )?;
      }
      RuntimeGlobals::NODE_MODULE_DECORATOR => {
        compilation.add_runtime_module(
          chunk_ukey,
          NodeModuleDecoratorRuntimeModule::default().boxed(),
        )?;
      }
      RuntimeGlobals::SYSTEM_CONTEXT if matches!(&library_type, Some(t) if t == "system") => {
        compilation
          .add_runtime_module(chunk_ukey, SystemContextRuntimeModule::default().boxed())?;
      }
      RuntimeGlobals::SCRIPT_NONCE => {
        compilation.add_runtime_module(chunk_ukey, NonceRuntimeModule::default().boxed())?;
      }
      RuntimeGlobals::RELATIVE_URL => {
        compilation.add_runtime_module(chunk_ukey, RelativeUrlRuntimeModule::default().boxed())?;
      }
      RuntimeGlobals::CHUNK_NAME => {
        compilation.add_runtime_module(chunk_ukey, ChunkNameRuntimeModule::default().boxed())?;
      }
      RuntimeGlobals::RUNTIME_ID => {
        compilation.add_runtime_module(chunk_ukey, RuntimeIdRuntimeModule::default().boxed())?;
      }
      RuntimeGlobals::PREFETCH_CHUNK => {
        compilation.add_runtime_module(
          chunk_ukey,
          ChunkPrefetchPreloadFunctionRuntimeModule::new(
            "prefetch",
            RuntimeGlobals::PREFETCH_CHUNK,
            RuntimeGlobals::PREFETCH_CHUNK_HANDLERS,
          )
          .boxed(),
        )?;
      }
      RuntimeGlobals::PRELOAD_CHUNK => {
        compilation.add_runtime_module(
          chunk_ukey,
          ChunkPrefetchPreloadFunctionRuntimeModule::new(
            "preload",
            RuntimeGlobals::PRELOAD_CHUNK,
            RuntimeGlobals::PRELOAD_CHUNK_HANDLERS,
          )
          .boxed(),
        )?;
      }
      RuntimeGlobals::AMD_DEFINE => {
        if compilation.options.amd.is_some() {
          compilation.add_runtime_module(chunk_ukey, AmdDefineRuntimeModule::default().boxed())?;
        }
      }
      RuntimeGlobals::AMD_OPTIONS => {
        if let Some(options) = &compilation.options.amd {
          compilation.add_runtime_module(
            chunk_ukey,
            AmdOptionsRuntimeModule::new(options.clone()).boxed(),
          )?;
        }
      }
      _ => {}
    }
  }

  Ok(None)
}

#[async_trait]
impl Plugin for RuntimePlugin {
  fn name(&self) -> &'static str {
    "rustbolt.RuntimePlugin"
  }

  fn apply(&self, ctx: PluginContext<&mut ApplyContext>, _options: &CompilerOptions) -> Result<()> {
    ctx
      .context
      .compiler_hooks
      .compilation
      .tap(compilation::new(self));
    ctx
      .context
      .compilation_hooks
      .runtime_requirement_in_module
      .tap(runtime_requirements_in_module::new(self));
    ctx
      .context
      .compilation_hooks
      .runtime_requirement_in_tree
      .tap(runtime_requirements_in_tree::new(self));
    Ok(())
  }
}
