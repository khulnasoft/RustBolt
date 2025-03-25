use quote::quote;
use syn::{parse::Parser, parse_macro_input, ItemStruct};

pub fn impl_runtime_module(
  _args: proc_macro::TokenStream,
  tokens: proc_macro::TokenStream,
) -> proc_macro::TokenStream {
  let mut input = parse_macro_input!(tokens as ItemStruct);
  let name = &input.ident;
  let generics = &input.generics;
  let (impl_generics, ty_generics, where_clause) = generics.split_for_impl();
  let origin_fields = input.fields.clone();

  if let syn::Fields::Named(ref mut fields) = input.fields {
    fields.named.push(
      syn::Field::parse_named
        .parse2(quote! { pub source_map_kind: ::rustbolt_util::source_map::SourceMapKind })
        .expect("Failed to parse new field for source_map_kind"),
    );
    fields.named.push(
      syn::Field::parse_named
        .parse2(quote! {
            #[cacheable(with=rustbolt_cacheable::with::AsOption<rustbolt_cacheable::with::AsPreset>)]
            pub custom_source: Option<::rustbolt_core::rustbolt_sources::BoxSource>
        })
        .expect("Failed to parse new field for custom_source"),
    );
    fields.named.push(
      syn::Field::parse_named
            .parse2(quote! {
                #[cacheable(with=rustbolt_cacheable::with::Skip)]
                pub cached_generated_code: std::sync::Arc<std::sync::RwLock<Option<::rustbolt_core::rustbolt_sources::BoxSource>>>
            })
        .expect("Failed to parse new field for cached_generated_code"),
    );
  }

  let field_names = origin_fields
    .iter()
    .map(|field| field.ident.as_ref().expect("Expected named struct"))
    .collect::<Vec<_>>();
  let field_tys: Vec<&syn::Type> = origin_fields.iter().map(|field| &field.ty).collect();
  let with_default = quote! {
    #[allow(clippy::too_many_arguments)]
    fn with_default(#(#field_names: #field_tys,)*) -> Self {
      Self {
        source_map_kind: ::rustbolt_util::source_map::SourceMapKind::empty(),
        custom_source: None,
        cached_generated_code: Default::default(),
        #(#field_names,)*
      }
    }
  };

  quote! {
    #[rustbolt_cacheable::cacheable]
    #input

    impl #impl_generics #name #ty_generics #where_clause {
      #with_default

      async fn get_generated_code(
        &self,
        compilation: &::rustbolt_core::Compilation,
      ) -> ::rustbolt_error::Result<std::sync::Arc<dyn ::rustbolt_core::rustbolt_sources::Source>> {
        {
          let mut cached_generated_code = self.cached_generated_code.read().expect("Failed to acquire read lock on cached_generated_code");
          if let Some(cached_generated_code) = (*cached_generated_code).as_ref() {
            return Ok(cached_generated_code.clone());
          }
        }
        let source = self.generate_with_custom(compilation).await?;
        {
          let mut cached_generated_code = self.cached_generated_code.write().expect("Failed to acquire write lock on cached_generated_code");
          *cached_generated_code = Some(source.clone());
        }
        Ok(source)
      }
    }

    impl #impl_generics ::rustbolt_core::CustomSourceRuntimeModule for #name #ty_generics #where_clause {
      fn set_custom_source(&mut self, source: ::rustbolt_core::rustbolt_sources::BoxSource) -> () {
        self.custom_source = Some(source);
      }
      fn get_custom_source(&self) -> Option<::rustbolt_core::rustbolt_sources::BoxSource> {
        self.custom_source.clone()
      }
      fn get_constructor_name(&self) -> String {
        String::from(stringify!(#name))
      }
    }

    impl #impl_generics rustbolt_collections::Identifiable for #name #ty_generics #where_clause {
      fn identifier(&self) -> rustbolt_collections::Identifier {
        self.name()
      }
    }

    impl #impl_generics ::rustbolt_core::DependenciesBlock for #name #ty_generics #where_clause {
      fn add_block_id(&mut self, _: ::rustbolt_core::AsyncDependenciesBlockIdentifier) {
        unreachable!()
      }

      fn get_blocks(&self) -> &[::rustbolt_core::AsyncDependenciesBlockIdentifier] {
        unreachable!()
      }

      fn add_dependency_id(&mut self, _: ::rustbolt_core::DependencyId) {
        unreachable!()
      }

      fn remove_dependency_id(&mut self, _: ::rustbolt_core::DependencyId) {
        unreachable!()
      }

      fn get_dependencies(&self) -> &[::rustbolt_core::DependencyId] {
        unreachable!()
      }
    }

    #[rustbolt_cacheable::cacheable_dyn]
    #[async_trait::async_trait]
    impl #impl_generics ::rustbolt_core::Module for #name #ty_generics #where_clause {
      fn module_type(&self) -> &::rustbolt_core::ModuleType {
        &::rustbolt_core::ModuleType::Runtime
      }

      fn source_types(&self) -> &[::rustbolt_core::SourceType] {
        &[::rustbolt_core::SourceType::JavaScript]
      }

      fn size(&self, _source_type: Option<&::rustbolt_core::SourceType>, compilation: Option<&::rustbolt_core::Compilation>) -> f64 {
        match compilation {
          Some(compilation) => {
            let mut cached_generated_code = self.cached_generated_code.read().expect("Failed to acquire read lock on cached_generated_code");
            if let Some(cached_generated_code) = (*cached_generated_code).as_ref() {
              cached_generated_code.size() as f64
            } else {
              panic!("get size of runtime module before code generation")
            }
          },
          None => 0f64
        }
      }

      fn readable_identifier(&self, _context: &::rustbolt_core::Context) -> std::borrow::Cow<str> {
        self.name().as_str().into()
      }

      fn source(&self) -> Option<&::rustbolt_core::rustbolt_sources::BoxSource> {
        None
      }

      fn factory_meta(&self) -> Option<&::rustbolt_core::FactoryMeta> {
        None
      }

      fn set_factory_meta(&mut self, v: ::rustbolt_core::FactoryMeta) {}

      fn build_info(&self) -> &::rustbolt_core::BuildInfo {
        unreachable!()
      }

      fn build_info_mut(&mut self) -> &mut ::rustbolt_core::BuildInfo {
        unreachable!()
      }

      fn build_meta(&self) -> &::rustbolt_core::BuildMeta {
        unreachable!()
      }

      fn build_meta_mut(&mut self) -> &mut ::rustbolt_core::BuildMeta {
        unreachable!()
      }

      async fn code_generation(
        &self,
        compilation: &::rustbolt_core::Compilation,
        _runtime: Option<&::rustbolt_core::RuntimeSpec>,
        _: Option<::rustbolt_core::ConcatenationScope>,
      ) -> rustbolt_error::Result<::rustbolt_core::CodeGenerationResult> {
        let mut result = ::rustbolt_core::CodeGenerationResult::default();
        result.add(::rustbolt_core::SourceType::Runtime, self.get_generated_code(compilation).await?);
        Ok(result)
      }

      async fn get_runtime_hash(
        &self,
        compilation: &::rustbolt_core::Compilation,
        runtime: Option<&::rustbolt_core::RuntimeSpec>,
      ) -> rustbolt_error::Result<::rustbolt_hash::RustboltHashDigest> {
        use rustbolt_util::ext::DynHash;
        let mut hasher = rustbolt_hash::RustboltHash::from(&compilation.options.output);
        self.name().dyn_hash(&mut hasher);
        self.stage().dyn_hash(&mut hasher);
        if self.full_hash() || self.dependent_hash() {
          self.generate_with_custom(compilation).await?.dyn_hash(&mut hasher);
        } else {
          self.get_generated_code(compilation).await?.dyn_hash(&mut hasher);
        }
        Ok(hasher.digest(&compilation.options.output.hash_digest))
      }
    }

    impl #impl_generics rustbolt_error::Diagnosable for #name  #ty_generics #where_clause {
      fn add_diagnostic(&mut self, _diagnostic: rustbolt_error::Diagnostic) {
        unreachable!()
      }
      fn add_diagnostics(&mut self, _diagnostics: Vec<rustbolt_error::Diagnostic>) {
        unreachable!()
      }
      fn diagnostics(&self) -> std::borrow::Cow<[rustbolt_error::Diagnostic]> {
        std::borrow::Cow::Owned(vec![])
      }
    }

    impl #impl_generics ::rustbolt_util::source_map::ModuleSourceMapConfig for #name #ty_generics #where_clause {
      fn get_source_map_kind(&self) -> &::rustbolt_util::source_map::SourceMapKind {
        &self.source_map_kind
      }

      fn set_source_map_kind(&mut self, source_map_kind: ::rustbolt_util::source_map::SourceMapKind) {
        self.source_map_kind = source_map_kind;
      }
    }
  }
  .into()
}
