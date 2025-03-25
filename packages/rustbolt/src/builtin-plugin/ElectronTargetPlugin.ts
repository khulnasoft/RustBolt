import { BuiltinPluginName } from "@rustbolt/binding";

import { create } from "./base";

export const ElectronTargetPlugin = create(
	BuiltinPluginName.ElectronTargetPlugin,
	(context?: string) => context ?? "none"
);
