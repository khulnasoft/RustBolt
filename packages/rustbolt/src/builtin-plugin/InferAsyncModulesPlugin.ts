import { BuiltinPluginName } from "@rustbolt/binding";

import { create } from "./base";

export const InferAsyncModulesPlugin = create(
	BuiltinPluginName.InferAsyncModulesPlugin,
	() => {},
	"compilation"
);
