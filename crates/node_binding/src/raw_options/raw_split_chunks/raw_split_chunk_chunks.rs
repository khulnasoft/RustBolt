use std::sync::Arc;

use napi::{bindgen_prelude::Either3, JsString};
use rustbolt_collections::DatabaseItem;
use rustbolt_napi::{string::JsStringExt, threadsafe_function::ThreadsafeFunction};
use rustbolt_regex::RustboltRegex;

use crate::JsChunkWrapper;

pub type Chunks = Either3<RustboltRegex, JsString, ThreadsafeFunction<JsChunkWrapper, bool>>;

pub fn create_chunks_filter(raw: Chunks) -> rustbolt_plugin_split_chunks::ChunkFilter {
  match raw {
    Either3::A(regex) => rustbolt_plugin_split_chunks::create_regex_chunk_filter_from_str(regex),
    Either3::B(js_str) => {
      let js_str = js_str.into_string();
      rustbolt_plugin_split_chunks::create_chunk_filter_from_str(&js_str)
    }
    Either3::C(f) => Arc::new(move |chunk, compilation| {
      let f = f.clone();
      let chunk_wrapper = JsChunkWrapper::new(chunk.ukey(), compilation);
      Box::pin(async move { f.call(chunk_wrapper).await })
    }),
  }
}
