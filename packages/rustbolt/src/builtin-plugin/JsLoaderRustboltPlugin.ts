import { BuiltinPluginName } from "@rustbolt/binding";

import type { Compiler } from "../Compiler";
import { runLoaders } from "../loader-runner";
import { create } from "./base";

export const JsLoaderRustboltPlugin = create(
	BuiltinPluginName.JsLoaderRustboltPlugin,
	(compiler: Compiler) => runLoaders.bind(null, compiler),
	/* Not Inheretable */
	"thisCompilation"
);
