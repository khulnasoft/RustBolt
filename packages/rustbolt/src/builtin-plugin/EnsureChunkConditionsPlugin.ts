import { BuiltinPluginName } from "@rustbolt/binding";

import { create } from "./base";

export const EnsureChunkConditionsPlugin = create(
	BuiltinPluginName.EnsureChunkConditionsPlugin,
	() => {}
);
