import { BuiltinPluginName } from "@rustbolt/binding";

import { create } from "./base";

export const JsonModulesPlugin = create(
	BuiltinPluginName.JsonModulesPlugin,
	() => {},
	"compilation"
);
