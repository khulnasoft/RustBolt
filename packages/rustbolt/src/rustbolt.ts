/**
 * The following code is modified based on
 * https://github.com/webpack/webpack/blob/4b4ca3b/lib
 *
 * MIT Licensed
 * Author Tobias Koppers @sokra
 * Copyright (c) JS Foundation and other contributors
 * https://github.com/webpack/webpack/blob/main/LICENSE
 */
import assert from "node:assert";
import util from "node:util";
import type { Callback } from "@rustbolt/lite-tapable";

import { Compiler } from "./Compiler";
import {
	MultiCompiler,
	type MultiCompilerOptions,
	type MultiRustboltOptions
} from "./MultiCompiler";
import MultiStats from "./MultiStats";
import { Stats } from "./Stats";
import {
	type RustboltOptions,
	type RustboltPluginFunction,
	applyRustboltOptionsBaseDefaults,
	applyRustboltOptionsDefaults,
	getNormalizedRustboltOptions
} from "./config";
import { rustboltOptions } from "./config/zod";
import NodeEnvironmentPlugin from "./node/NodeEnvironmentPlugin";
import { RustboltOptionsApply } from "./rustboltOptionsApply";
import { asArray, isNil } from "./util";
import { validate } from "./util/validate";

function createMultiCompiler(options: MultiRustboltOptions): MultiCompiler {
	const compilers = options.map(createCompiler);
	const compiler = new MultiCompiler(
		compilers,
		options as MultiCompilerOptions
	);
	for (const childCompiler of compilers) {
		if (childCompiler.options.dependencies) {
			compiler.setDependencies(
				childCompiler,
				childCompiler.options.dependencies
			);
		}
	}

	return compiler;
}

function createCompiler(userOptions: RustboltOptions): Compiler {
	const options = getNormalizedRustboltOptions(userOptions);
	applyRustboltOptionsBaseDefaults(options);
	assert(!isNil(options.context));
	const compiler = new Compiler(options.context, options);

	new NodeEnvironmentPlugin({
		infrastructureLogging: options.infrastructureLogging
	}).apply(compiler);

	if (Array.isArray(options.plugins)) {
		for (const plugin of options.plugins) {
			if (typeof plugin === "function") {
				(plugin as RustboltPluginFunction).call(compiler, compiler);
			} else if (plugin) {
				plugin.apply(compiler);
			}
		}
	}
	applyRustboltOptionsDefaults(compiler.options);

	compiler.hooks.environment.call();
	compiler.hooks.afterEnvironment.call();
	new RustboltOptionsApply().process(compiler.options, compiler);
	compiler.hooks.initialize.call();
	return compiler;
}

function isMultiRustboltOptions(o: unknown): o is MultiRustboltOptions {
	return Array.isArray(o);
}

function rustbolt(options: MultiRustboltOptions): MultiCompiler;
function rustbolt(options: RustboltOptions): Compiler;
function rustbolt(
	options: MultiRustboltOptions | RustboltOptions
): MultiCompiler | Compiler;
function rustbolt(
	options: MultiRustboltOptions,
	callback?: Callback<Error, MultiStats>
): null | MultiCompiler;
function rustbolt(
	options: RustboltOptions,
	callback?: Callback<Error, Stats>
): null | Compiler;
function rustbolt(
	options: MultiRustboltOptions | RustboltOptions,
	callback?: Callback<Error, MultiStats | Stats>
): null | MultiCompiler | Compiler;
function rustbolt(
	options: MultiRustboltOptions | RustboltOptions,
	callback?: Callback<Error, MultiStats> | Callback<Error, Stats>
) {
	try {
		for (const o of asArray(options)) {
			validate(o, rustboltOptions);
		}
	} catch (e) {
		if (e instanceof Error && callback) {
			callback(e);
			return null;
		}
		throw e;
	}
	const create = () => {
		if (isMultiRustboltOptions(options)) {
			const compiler = createMultiCompiler(options);
			const watch = options.some(options => options.watch);
			const watchOptions = options.map(options => options.watchOptions || {});
			return { compiler, watch, watchOptions };
		}
		const compiler = createCompiler(options);
		const watch = options.watch;
		const watchOptions = options.watchOptions || {};
		return { compiler, watch, watchOptions };
	};

	if (callback) {
		try {
			const { compiler, watch, watchOptions } = create();
			if (watch) {
				compiler.watch(watchOptions as any, callback as any);
			} else {
				compiler.run((err, stats) => {
					compiler.close(() => {
						callback(err, stats as any);
					});
				});
			}
			return compiler;
		} catch (err: any) {
			process.nextTick(() => callback(err));
			return null;
		}
	} else {
		const { compiler, watch } = create();
		if (watch) {
			util.deprecate(
				() => {},
				"A 'callback' argument needs to be provided to the 'rustbolt(options, callback)' function when the 'watch' option is set. There is no way to handle the 'watch' option without a callback."
			)();
		}
		return compiler;
	}
}

// deliberately alias rustbolt as webpack
export { createCompiler, createMultiCompiler, MultiStats, rustbolt, Stats };
export default rustbolt;
