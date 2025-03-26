import { BuiltinPluginName } from "@rustbolt/binding";

import { create } from "./base";

export const MergeDuplicateChunksPlugin = create(
	BuiltinPluginName.MergeDuplicateChunksPlugin,
	() => {}
);
