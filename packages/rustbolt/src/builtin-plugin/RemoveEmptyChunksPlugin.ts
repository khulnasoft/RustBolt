import { BuiltinPluginName } from "@rustbolt/binding";

import { create } from "./base";

export const RemoveEmptyChunksPlugin = create(
	BuiltinPluginName.RemoveEmptyChunksPlugin,
	() => {},
	"compilation"
);
