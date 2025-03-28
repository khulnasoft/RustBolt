import { BuiltinPluginName } from "@rustbolt/binding";

import { create } from "./base";

export const NamedModuleIdsPlugin = create(
	BuiltinPluginName.NamedModuleIdsPlugin,
	() => {},
	"compilation"
);
