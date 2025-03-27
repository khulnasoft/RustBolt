use rustbolt_collections::IdentifierMap;
use rustbolt_hash::RustboltHashDigest;

use crate::{ModuleIdentifier, RuntimeSpec, RuntimeSpecMap};

#[derive(Debug, Default)]
pub struct CgmHashArtifact {
  module_to_hashes: IdentifierMap<RuntimeSpecMap<RustboltHashDigest>>,
}

impl CgmHashArtifact {
  pub fn is_empty(&self) -> bool {
    self.module_to_hashes.is_empty()
  }

  pub fn get(
    &self,
    module: &ModuleIdentifier,
    runtime: &RuntimeSpec,
  ) -> Option<&RustboltHashDigest> {
    let hashes = self.module_to_hashes.get(module)?;
    hashes.get(runtime)
  }

  pub fn set_hashes(
    &mut self,
    module: ModuleIdentifier,
    hashes: RuntimeSpecMap<RustboltHashDigest>,
  ) -> bool {
    if let Some(old) = self.module_to_hashes.get(&module)
      && old == &hashes
    {
      false
    } else {
      self.module_to_hashes.insert(module, hashes);
      true
    }
  }

  pub fn remove(
    &mut self,
    module: &ModuleIdentifier,
  ) -> Option<RuntimeSpecMap<RustboltHashDigest>> {
    self.module_to_hashes.remove(module)
  }
}
