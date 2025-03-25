import { BuiltinPluginName } from "@rustbolt/binding";

import { create } from "./base";

export const ChunkPrefetchPreloadPlugin = create(
	BuiltinPluginName.ChunkPrefetchPreloadPlugin,
	() => {}
);
