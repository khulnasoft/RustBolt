import { BuiltinPluginName } from "@rustbolt/binding";

import { create } from "./base";

export const DataUriPlugin = create(
	BuiltinPluginName.DataUriPlugin,
	() => {},
	"compilation"
);
