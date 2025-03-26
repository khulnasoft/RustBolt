import { BuiltinPluginName } from "@rustbolt/binding";

import { create } from "./base";

export const NodeTargetPlugin = create(
	BuiltinPluginName.NodeTargetPlugin,
	() => undefined
);
