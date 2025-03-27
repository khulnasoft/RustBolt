import { BuiltinPluginName } from "@rustbolt/binding";

import { create } from "./base";

export const AssetModulesPlugin = create(
	BuiltinPluginName.AssetModulesPlugin,
	() => {},
	"compilation"
);
