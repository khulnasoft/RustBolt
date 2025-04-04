import { type BuiltinPlugin, BuiltinPluginName } from "@rustbolt/binding";
import type { Compiler } from "../Compiler";
import type { Incremental } from "../config";
import { RustboltBuiltinPlugin, createBuiltinPlugin } from "./base";

export class DeterministicModuleIdsPlugin extends RustboltBuiltinPlugin {
	name = BuiltinPluginName.DeterministicModuleIdsPlugin;
	affectedHooks = "compilation" as const;

	raw(compiler: Compiler): BuiltinPlugin {
		const incremental = compiler.options.experiments.incremental as Incremental;
		const logger = compiler.getInfrastructureLogger(
			"rustbolt.DeterministicModuleIdsPlugin"
		);
		if (incremental.moduleIds) {
			incremental.moduleIds = false;
			logger.warn(
				"`optimization.moduleIds = 'deterministic'` can't be used with `incremental.moduleIds` as deterministic module ids is a global effect. `incremental.moduleIds` has been overridden to false. We recommend enabling incremental only in the development mode."
			);
		}
		return createBuiltinPlugin(this.name, undefined);
	}
}
