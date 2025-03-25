import { type BuiltinPlugin, BuiltinPluginName } from "@rustbolt/binding";
import type { Compiler } from "../Compiler";
import type { Incremental } from "../config";
import { RustboltBuiltinPlugin, createBuiltinPlugin } from "./base";

export class DeterministicChunkIdsPlugin extends RustboltBuiltinPlugin {
	name = BuiltinPluginName.DeterministicChunkIdsPlugin;
	affectedHooks = "compilation" as const;

	raw(compiler: Compiler): BuiltinPlugin {
		const incremental = compiler.options.experiments.incremental as Incremental;
		const logger = compiler.getInfrastructureLogger(
			"rustbolt.DeterministicChunkIdsPlugin"
		);
		if (incremental.chunkIds) {
			incremental.chunkIds = false;
			logger.warn(
				"`optimization.chunkIds = 'deterministic'` can't be used with `incremental.chunkIds` as deterministic chunk ids is a global effect. `incremental.chunkIds` has been overridden to false. We recommend enabling incremental only in the development mode."
			);
		}
		return createBuiltinPlugin(this.name, undefined);
	}
}
