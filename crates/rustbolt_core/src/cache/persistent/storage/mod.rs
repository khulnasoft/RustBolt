// TODO add #[cfg(test)]
mod memory;

use std::{path::PathBuf, sync::Arc};

pub use memory::MemoryStorage;
use rustbolt_fs::IntermediateFileSystem;
pub use rustbolt_storage::Storage;
use rustbolt_storage::{BridgeFileSystem, PackStorage, PackStorageOptions};

/// Storage Options
///
/// This enum contains all of supported storage options.
/// Since MemoryStorage is only used in unit test, there is no need to add it here.
#[derive(Debug, Clone)]
pub enum StorageOptions {
  FileSystem { directory: PathBuf },
}

pub fn create_storage(
  options: StorageOptions,
  version: String,
  fs: Arc<dyn IntermediateFileSystem>,
) -> Arc<dyn Storage> {
  match options {
    StorageOptions::FileSystem { directory } => {
      let option = PackStorageOptions {
        temp_root: directory.join(".temp"),
        root: directory,
        clean: true,
        bucket_size: 20,
        pack_size: 500 * 1024,
        expire: 7 * 24 * 60 * 60 * 1000,
        fs: Arc::new(BridgeFileSystem(fs)),
        fresh_generation: Some(1),
        release_generation: Some(2),
        version,
      };
      Arc::new(PackStorage::new(option))
    }
  }
}
