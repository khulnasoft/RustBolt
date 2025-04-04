import { BuiltinPluginName } from "@rustbolt/binding";

import { create } from "./base";

export const AsyncWebAssemblyModulesPlugin = create(
	BuiltinPluginName.AsyncWebAssemblyModulesPlugin,
	() => {},
	"compilation"
);
