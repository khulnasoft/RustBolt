import {
	BuiltinPluginName,
	type RawBundlerInfoPluginOptions
} from "@rustbolt/binding";

import { create } from "./base";

export type BundleInfoOptions = {
	version?: string;
	bundler?: string;
	force?: boolean | string[];
};

export const BundlerInfoRustboltPlugin = create(
	BuiltinPluginName.BundlerInfoRustboltPlugin,
	(options: BundleInfoOptions): RawBundlerInfoPluginOptions => {
		return {
			version: options.version || "unknown",
			bundler: options.bundler || "rustbolt",
			force: options.force ?? true
		};
	}
);
