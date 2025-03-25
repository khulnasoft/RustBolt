use rustbolt_cacheable::{cacheable, cacheable_dyn};
use rustbolt_core::{
  AsContextDependency, AsDependencyTemplate, Dependency, DependencyCategory, DependencyId,
  DependencyType, FactorizeInfo, ModuleDependency,
};

#[cacheable]
#[derive(Debug, Clone)]
pub struct RemoteToExternalDependency {
  id: DependencyId,
  request: String,
  factorize_info: FactorizeInfo,
}

impl RemoteToExternalDependency {
  pub fn new(request: String) -> Self {
    Self {
      id: DependencyId::new(),
      request,
      factorize_info: Default::default(),
    }
  }
}

#[cacheable_dyn]
impl Dependency for RemoteToExternalDependency {
  fn id(&self) -> &DependencyId {
    &self.id
  }

  fn dependency_type(&self) -> &DependencyType {
    &DependencyType::RemoteToExternal
  }

  fn category(&self) -> &DependencyCategory {
    &DependencyCategory::Esm
  }

  fn could_affect_referencing_module(&self) -> rustbolt_core::AffectType {
    rustbolt_core::AffectType::True
  }
}

#[cacheable_dyn]
impl ModuleDependency for RemoteToExternalDependency {
  fn request(&self) -> &str {
    &self.request
  }

  fn factorize_info(&self) -> &FactorizeInfo {
    &self.factorize_info
  }

  fn factorize_info_mut(&mut self) -> &mut FactorizeInfo {
    &mut self.factorize_info
  }
}

impl AsContextDependency for RemoteToExternalDependency {}
impl AsDependencyTemplate for RemoteToExternalDependency {}
