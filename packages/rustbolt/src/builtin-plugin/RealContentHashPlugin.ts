import { BuiltinPluginName } from "@rustbolt/binding";

import { create } from "./base";

export const RealContentHashPlugin = create(
	BuiltinPluginName.RealContentHashPlugin,
	() => {},
	"compilation"
);
