use std::marker::PhantomData;

use rustbolt_collections::Identifier;
use rustbolt_core::{rustbolt_sources::Source, Compilation, RuntimeModule};
use rustbolt_macros::impl_runtime_module;

#[allow(dead_code)]
#[test]
fn with_generic() {
  #[impl_runtime_module]
  #[derive(Debug)]
  struct Foo<T: std::fmt::Debug + Send + Sync + Eq + 'static> {
    marker: PhantomData<T>,
  }

  #[async_trait::async_trait]
  impl<T: std::fmt::Debug + Send + Sync + Eq + 'static> RuntimeModule for Foo<T> {
    fn name(&self) -> Identifier {
      todo!()
    }

    async fn generate(
      &self,
      _: &Compilation,
    ) -> rustbolt_error::Result<rustbolt_core::rustbolt_sources::BoxSource> {
      todo!()
    }
  }
}
