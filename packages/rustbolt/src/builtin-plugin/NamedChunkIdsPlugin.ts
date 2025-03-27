import { BuiltinPluginName } from "@rustbolt/binding";

import { create } from "./base";

export const NamedChunkIdsPlugin = create(
	BuiltinPluginName.NamedChunkIdsPlugin,
	() => {},
	"compilation"
);
