import { BuiltinPluginName } from "@rustbolt/binding";

import { create } from "./base";

export const FetchCompileAsyncWasmPlugin = create(
	BuiltinPluginName.FetchCompileAsyncWasmPlugin,
	() => {},
	"thisCompilation"
);
