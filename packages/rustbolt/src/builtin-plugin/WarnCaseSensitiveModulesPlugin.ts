import { BuiltinPluginName } from "@rustbolt/binding";

import { create } from "./base";

export const WarnCaseSensitiveModulesPlugin = create(
	BuiltinPluginName.WarnCaseSensitiveModulesPlugin,
	() => {},
	"compilation"
);
