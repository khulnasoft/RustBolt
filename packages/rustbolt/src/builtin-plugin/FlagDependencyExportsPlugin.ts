import { BuiltinPluginName } from "@rustbolt/binding";

import { create } from "./base";

export const FlagDependencyExportsPlugin = create(
	BuiltinPluginName.FlagDependencyExportsPlugin,
	() => {},
	"compilation"
);
