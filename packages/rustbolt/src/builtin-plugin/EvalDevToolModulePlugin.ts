import {
	BuiltinPluginName,
	type RawEvalDevToolModulePluginOptions
} from "@rustbolt/binding";

import { create } from "./base";

export type { RawEvalDevToolModulePluginOptions as EvalDevToolModulePluginOptions };

export const EvalDevToolModulePlugin = create(
	BuiltinPluginName.EvalDevToolModulePlugin,
	(options: RawEvalDevToolModulePluginOptions) => options,
	"compilation"
);
