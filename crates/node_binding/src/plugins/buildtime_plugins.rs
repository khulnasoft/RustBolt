use rustbolt_core::{BoxPlugin, PluginExt};
use rustbolt_plugin_javascript::{api_plugin::APIPlugin, JsPlugin};
use rustbolt_plugin_runtime::RuntimePlugin;

pub fn buildtime_plugins() -> Vec<BoxPlugin> {
  vec![
    JsPlugin::default().boxed(),
    RuntimePlugin::default().boxed(),
    APIPlugin::default().boxed(),
  ]
}
