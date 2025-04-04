import { BuiltinPluginName } from "@rustbolt/binding";

import { create } from "./base";

export const SideEffectsFlagPlugin = create(
	BuiltinPluginName.SideEffectsFlagPlugin,
	() => {},
	"compilation"
);
