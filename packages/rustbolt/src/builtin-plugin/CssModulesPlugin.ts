import { BuiltinPluginName } from "@rustbolt/binding";

import { create } from "./base";

export const CssModulesPlugin = create(
	BuiltinPluginName.CssModulesPlugin,
	() => {},
	"compilation"
);
