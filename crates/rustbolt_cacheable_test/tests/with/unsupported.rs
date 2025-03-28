use rustbolt_cacheable::{cacheable, with::Unsupported, SerializeError};

struct UnCacheable;

#[cacheable]
struct App {
  #[cacheable(with=Unsupported)]
  info: UnCacheable,
}

#[test]
fn test_unsupport() {
  let app = App { info: UnCacheable };

  assert!(matches!(
    rustbolt_cacheable::to_bytes(&app, &()),
    Err(SerializeError::UnsupportedField)
  ));
}
