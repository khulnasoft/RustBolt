import { type BuiltinPlugin, BuiltinPluginName } from "@rustbolt/binding";

import type { Compiler } from "../Compiler";
import {
	RustboltBuiltinPlugin,
	createBuiltinPlugin
} from "../builtin-plugin/base";

const compilerSet = new WeakSet<Compiler>();

function isSingleton(compiler: Compiler) {
	return compilerSet.has(compiler);
}

function setSingleton(compiler: Compiler) {
	compilerSet.add(compiler);
}

export class ShareRuntimePlugin extends RustboltBuiltinPlugin {
	name = BuiltinPluginName.ShareRuntimePlugin;

	constructor(private enhanced = false) {
		super();
	}

	raw(compiler: Compiler): BuiltinPlugin | undefined {
		if (isSingleton(compiler)) return;
		setSingleton(compiler);
		return createBuiltinPlugin(this.name, this.enhanced);
	}
}
