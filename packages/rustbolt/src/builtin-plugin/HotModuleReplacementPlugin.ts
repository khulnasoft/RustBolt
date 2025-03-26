import { type BuiltinPlugin, BuiltinPluginName } from "@rustbolt/binding";

import type { Compiler } from "../Compiler";
import { RustboltBuiltinPlugin, createBuiltinPlugin } from "./base";

export class HotModuleReplacementPlugin extends RustboltBuiltinPlugin {
	name = BuiltinPluginName.HotModuleReplacementPlugin;

	raw(compiler: Compiler): BuiltinPlugin {
		if (compiler.options.output.strictModuleErrorHandling === undefined) {
			compiler.options.output.strictModuleErrorHandling = true;
		}
		return createBuiltinPlugin(this.name, undefined);
	}
}
