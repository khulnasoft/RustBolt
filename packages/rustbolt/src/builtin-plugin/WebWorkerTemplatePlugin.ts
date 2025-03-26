import { type BuiltinPlugin, BuiltinPluginName } from "@rustbolt/binding";

import type { Compiler } from "../Compiler";
import { RustboltBuiltinPlugin, createBuiltinPlugin } from "./base";

export class WebWorkerTemplatePlugin extends RustboltBuiltinPlugin {
	name = BuiltinPluginName.WebWorkerTemplatePlugin;

	raw(compiler: Compiler): BuiltinPlugin | undefined {
		compiler.options.output.chunkLoading = "import-scripts";
		return createBuiltinPlugin(this.name, undefined);
	}
}
