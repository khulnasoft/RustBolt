import {
	BuiltinPluginName,
	type RawHttpExternalsRustboltPluginOptions
} from "@rustbolt/binding";

import { create } from "./base";

export const HttpExternalsRustboltPlugin = create(
	BuiltinPluginName.HttpExternalsRustboltPlugin,
	(css: boolean, webAsync: boolean): RawHttpExternalsRustboltPluginOptions => {
		return {
			css,
			webAsync
		};
	}
);
