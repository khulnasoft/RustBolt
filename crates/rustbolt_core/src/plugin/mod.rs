mod context;
mod plugin_driver;

use std::fmt;

pub use context::*;
pub use plugin_driver::*;
use rustbolt_error::Result;

use crate::CompilerOptions;

#[async_trait::async_trait]
pub trait Plugin: fmt::Debug + Send + Sync {
  fn name(&self) -> &'static str {
    "unknown"
  }

  fn apply(
    &self,
    _ctx: PluginContext<&mut ApplyContext>,
    _options: &CompilerOptions,
  ) -> Result<()> {
    Ok(())
  }

  fn clear_cache(&self) {}
}

pub type BoxPlugin = Box<dyn Plugin>;

pub trait PluginExt {
  fn boxed(self) -> BoxPlugin;
}

impl<T: Plugin + 'static> PluginExt for T {
  fn boxed(self) -> BoxPlugin {
    Box::new(self)
  }
}
