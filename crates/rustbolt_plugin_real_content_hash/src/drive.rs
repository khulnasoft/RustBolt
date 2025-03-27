use std::sync::Arc;

use rustbolt_core::{rustbolt_sources::Source, Compilation};
use rustbolt_hook::define_hook;

define_hook!(RealContentHashPluginUpdateHash: AsyncSeriesBail(compilation: &Compilation, assets: &[Arc<dyn Source>], old_hash: &str) -> String);

#[derive(Debug, Default)]
pub struct RealContentHashPluginHooks {
  pub update_hash: RealContentHashPluginUpdateHashHook,
}
