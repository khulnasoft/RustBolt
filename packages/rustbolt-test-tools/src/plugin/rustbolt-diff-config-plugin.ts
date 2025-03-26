import type {
	Compiler,
	RustboltOptionsNormalized,
	RustboltPluginInstance
} from "@rustbolt/core";

const PLUGIN_NAME = "RustboltDiffConfigPlugin";

export class RustboltDiffConfigPlugin implements RustboltPluginInstance {
	name = PLUGIN_NAME;

	constructor(
		private modifier?: (
			options: RustboltOptionsNormalized
		) => RustboltOptionsNormalized
	) {
		process.env.RUSTBOLT_DIFF = "true"; // enable rustbolt diff
	}

	apply(compiler: Compiler) {
		const { options } = compiler;

		options.mode = "development";
		options.devtool = false;

		options.optimization ??= {};
		options.optimization.minimize = false;
		options.optimization.chunkIds = "named";
		options.optimization.moduleIds = "named";
		options.optimization.mangleExports ??= false;
		options.optimization.concatenateModules ??= false;

		options.output ??= {};
		options.output.pathinfo ??= false;

		options.output.environment ??= {};
		options.output.environment.arrowFunction ??= false;
		options.output.environment.bigIntLiteral ??= false;
		options.output.environment.const ??= false;
		options.output.environment.destructuring ??= false;
		options.output.environment.dynamicImport ??= false;
		options.output.environment.dynamicImportInWorker ??= false;
		options.output.environment.forOf ??= false;
		options.output.environment.globalThis ??= false;
		options.output.environment.module ??= false;
		options.output.environment.optionalChaining ??= false;
		options.output.environment.templateLiteral ??= false;

		options.experiments ??= {};
		options.experiments.rustboltFuture ??= {};

		if (typeof this.modifier === "function") {
			this.modifier(compiler.options);
		}
	}
}
