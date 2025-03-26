import {
	BuiltinPluginName,
	type RawSourceMapDevToolPluginOptions
} from "@rustbolt/binding";

import { create } from "./base";

export type { RawSourceMapDevToolPluginOptions as SourceMapDevToolPluginOptions };

export const SourceMapDevToolPlugin = create(
	BuiltinPluginName.SourceMapDevToolPlugin,
	(options: RawSourceMapDevToolPluginOptions) => options,
	"compilation"
);
