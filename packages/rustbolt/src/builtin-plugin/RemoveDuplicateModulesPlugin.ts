import { BuiltinPluginName } from "@rustbolt/binding";

import { create } from "./base";

export const RemoveDuplicateModulesPlugin = create(
	BuiltinPluginName.RemoveDuplicateModulesPlugin,
	() => {
		return {};
	}
);
