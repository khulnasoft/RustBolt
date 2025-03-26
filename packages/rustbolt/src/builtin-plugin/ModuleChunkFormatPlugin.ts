import { BuiltinPluginName } from "@rustbolt/binding";

import { create } from "./base";

export const ModuleChunkFormatPlugin = create(
	BuiltinPluginName.ModuleChunkFormatPlugin,
	() => {}
);
