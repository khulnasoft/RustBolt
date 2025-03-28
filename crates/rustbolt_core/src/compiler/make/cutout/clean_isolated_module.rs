use std::collections::VecDeque;

use rustbolt_collections::IdentifierSet;

use super::super::MakeArtifact;
use crate::ModuleIdentifier;

#[derive(Debug, Default)]
pub struct CleanIsolatedModule {
  need_check_isolated_module_ids: IdentifierSet,
}

impl CleanIsolatedModule {
  pub fn analyze_force_build_module(
    &mut self,
    artifact: &MakeArtifact,
    module_identifier: &ModuleIdentifier,
  ) {
    let module_graph = artifact.get_module_graph();
    for connection in module_graph.get_outgoing_connections(module_identifier) {
      self
        .need_check_isolated_module_ids
        .insert(*connection.module_identifier());
    }
  }

  pub fn add_need_check_module(&mut self, module_identifier: ModuleIdentifier) {
    self
      .need_check_isolated_module_ids
      .insert(module_identifier);
  }

  pub fn fix_artifact(self, artifact: &mut MakeArtifact) {
    let mut queue = VecDeque::from(
      self
        .need_check_isolated_module_ids
        .into_iter()
        .collect::<Vec<_>>(),
    );
    while let Some(module_identifier) = queue.pop_front() {
      let module_graph = artifact.get_module_graph();
      let Some(mgm) = module_graph.module_graph_module_by_identifier(&module_identifier) else {
        tracing::trace!("Module is cleaned: {}", module_identifier);
        continue;
      };
      if !mgm.incoming_connections().is_empty() {
        tracing::trace!("Module is used: {}", module_identifier);
        continue;
      }

      for connection in module_graph.get_outgoing_connections(&module_identifier) {
        // clean child module
        queue.push_back(*connection.module_identifier());
      }
      artifact.revoke_module(&module_identifier);
      tracing::trace!("Module is cleaned: {}", module_identifier);
    }
  }
}
