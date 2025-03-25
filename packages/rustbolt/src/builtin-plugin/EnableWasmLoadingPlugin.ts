import { BuiltinPluginName } from "@rustbolt/binding";

import { create } from "./base";

export const EnableWasmLoadingPlugin = create(
	BuiltinPluginName.EnableWasmLoadingPlugin,
	(type: string): string => type
);
