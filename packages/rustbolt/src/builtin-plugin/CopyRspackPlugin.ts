import {
	BuiltinPluginName,
	type RawCopyPattern,
	type RawCopyRustboltPluginOptions
} from "@rustbolt/binding";

import { create } from "./base";

export type CopyRustboltPluginOptions = {
	patterns: (
		| string
		| ({
				from: string;
		  } & Partial<RawCopyPattern>)
	)[];
};

export const CopyRustboltPlugin = create(
	BuiltinPluginName.CopyRustboltPlugin,
	(copy: CopyRustboltPluginOptions): RawCopyRustboltPluginOptions => {
		const ret: RawCopyRustboltPluginOptions = {
			patterns: []
		};

		ret.patterns = (copy.patterns || []).map(pattern => {
			if (typeof pattern === "string") {
				pattern = { from: pattern };
			}

			pattern.force ??= false;
			pattern.noErrorOnMissing ??= false;
			pattern.priority ??= 0;
			pattern.globOptions ??= {};
			pattern.copyPermissions ??= false;

			return pattern as RawCopyPattern;
		});

		return ret;
	}
);
