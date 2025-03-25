import {
	BuiltinPluginName,
	type RawFlagAllModulesAsUsedPluginOptions
} from "@rustbolt/binding";
import { create } from "./base";

export const FlagAllModulesAsUsedPlugin = create(
	BuiltinPluginName.FlagAllModulesAsUsedPlugin,
	(explanation: string): RawFlagAllModulesAsUsedPluginOptions => {
		return {
			explanation
		};
	}
);
