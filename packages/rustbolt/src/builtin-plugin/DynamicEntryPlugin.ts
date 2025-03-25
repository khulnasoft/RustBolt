import {
	type BuiltinPlugin,
	BuiltinPluginName,
	type RawDynamicEntryPluginOptions
} from "@rustbolt/binding";

import type { Compiler } from "../Compiler";
import type { EntryDynamicNormalized } from "../config";
import EntryOptionPlugin from "../lib/EntryOptionPlugin";
import { getRawEntryOptions } from "./EntryPlugin";
import { RustboltBuiltinPlugin, createBuiltinPlugin } from "./base";

export class DynamicEntryPlugin extends RustboltBuiltinPlugin {
	name = BuiltinPluginName.DynamicEntryPlugin;
	affectedHooks = "make" as const;

	constructor(
		private context: string,
		private entry: EntryDynamicNormalized
	) {
		super();
	}

	raw(compiler: Compiler): BuiltinPlugin | undefined {
		const raw: RawDynamicEntryPluginOptions = {
			context: this.context,
			entry: async () => {
				const result = await this.entry();
				return Object.entries(result).map(([name, desc]) => {
					const options = EntryOptionPlugin.entryDescriptionToOptions(
						compiler,
						name,
						desc
					);
					return {
						import: desc.import!,
						options: getRawEntryOptions(options)
					};
				});
			}
		};
		return createBuiltinPlugin(this.name, raw);
	}
}
