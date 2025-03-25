import { BuiltinPluginName } from "@rustbolt/binding";

import { create } from "./base";

export const NoEmitOnErrorsPlugin = create(
	BuiltinPluginName.NoEmitOnErrorsPlugin,
	() => undefined
);
