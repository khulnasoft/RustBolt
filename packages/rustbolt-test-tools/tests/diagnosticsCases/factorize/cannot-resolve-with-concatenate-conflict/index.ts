import { foo } from './reexport';

// should not panic at crates/rustbolt_plugin_javascript/src/dependency/esm/esm_export_imported_specifier_dependency.rs
foo;