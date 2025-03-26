mod context;
mod resolver;
mod scheduler;

use std::fmt::Debug;

pub use context::{JsLoaderContext, JsLoaderItem};
use napi::bindgen_prelude::*;
use rustbolt_core::{ApplyContext, CompilerOptions, Plugin, PluginContext};
use rustbolt_error::Result;
use rustbolt_hook::plugin;
use rustbolt_napi::threadsafe_function::ThreadsafeFunction;

pub type JsLoaderRunner = ThreadsafeFunction<JsLoaderContext, Promise<JsLoaderContext>>;

#[plugin]
pub(crate) struct JsLoaderRustboltPlugin {
  pub(crate) runner: JsLoaderRunner,
}

impl JsLoaderRustboltPlugin {
  pub fn new(runner: JsLoaderRunner) -> Self {
    Self::new_inner(runner)
  }
}

impl Debug for JsLoaderRustboltPlugin {
  fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
    f.debug_tuple("JsLoaderResolver").finish()
  }
}

impl Plugin for JsLoaderRustboltPlugin {
  fn name(&self) -> &'static str {
    "rustbolt.JsLoaderRustboltPlugin"
  }

  fn apply(&self, ctx: PluginContext<&mut ApplyContext>, _options: &CompilerOptions) -> Result<()> {
    ctx
      .context
      .normal_module_factory_hooks
      .resolve_loader
      .tap(resolver::resolve_loader::new(self));
    ctx
      .context
      .normal_module_hooks
      .loader_should_yield
      .tap(scheduler::loader_should_yield::new(self));
    ctx
      .context
      .normal_module_hooks
      .loader_yield
      .tap(scheduler::loader_yield::new(self));
    Ok(())
  }
}
