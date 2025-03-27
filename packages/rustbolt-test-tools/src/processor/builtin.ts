import { rustbolt } from "@rustbolt/core";
import fs from "fs-extra";
import { merge } from "webpack-merge";

import {
	ECompilerType,
	type ITestContext,
	type TCompilerOptions
} from "../type";
import { type ISnapshotProcessorOptions, SnapshotProcessor } from "./snapshot";

export interface IBuiltinProcessorOptions<T extends ECompilerType>
	extends Omit<ISnapshotProcessorOptions<T>, "runable"> {}

export class BuiltinProcessor<
	T extends ECompilerType
> extends SnapshotProcessor<T> {
	constructor(protected _builtinOptions: IBuiltinProcessorOptions<T>) {
		super({
			defaultOptions: BuiltinProcessor.defaultOptions,
			runable: false,
			..._builtinOptions
		});
	}

	static defaultOptions<T extends ECompilerType>(
		this: BuiltinProcessor<T>,
		context: ITestContext
	): TCompilerOptions<T> {
		let defaultOptions = {
			entry: {
				main: {
					import: "./index"
				}
			},
			output: {
				publicPath: "/",
				path: context.getDist(),
				filename: "[name].js",
				chunkFilename: "[name].js",
				chunkFormat: "array-push",
				cssFilename: "[name].css",
				cssChunkFilename: "[name].css",
				assetModuleFilename: "[hash][ext][query]",
				sourceMapFilename: "[file].map",
				chunkLoadingGlobal: "webpackChunkwebpack",
				chunkLoading: "jsonp",
				uniqueName: "__rustbolt_test__",
				enabledLibraryTypes: ["system"],
				strictModuleErrorHandling: false,
				iife: true,
				module: false,
				asyncChunks: true,
				scriptType: false,
				globalObject: "self",
				importFunctionName: "import",
				wasmLoading: "fetch",
				webassemblyModuleFilename: "[hash].module.wasm",
				workerChunkLoading: "import-scripts",
				workerWasmLoading: "fetch"
			},
			module: {
				rules: [
					{
						test: /\.json$/,
						type: "json"
					},
					{
						test: /\.mjs$/,
						type: "javascript/esm"
					},
					{
						test: /\.cjs$/,
						type: "javascript/dynamic"
					},
					{
						test: /\.js$/,
						type: "javascript/auto"
					},
					{
						test: /\.css$/,
						type: "css"
					},
					{
						test: /\.wasm$/,
						type: "webassembly/async"
					}
				]
			},
			node: {
				__dirname: "mock",
				__filename: "mock",
				global: "warn"
			},
			optimization: {
				runtimeChunk: {
					name: "runtime"
				},
				minimize: false,
				removeAvailableModules: true,
				removeEmptyChunks: true,
				moduleIds: "named",
				chunkIds: "named",
				sideEffects: false,
				mangleExports: false,
				usedExports: false,
				concatenateModules: false,
				nodeEnv: false
			},
			resolve: {
				extensions: [
					".js",
					".jsx",
					".ts",
					".tsx",
					".json",
					".d.ts",
					".css",
					".wasm"
				]
			},
			resolveLoader: {
				extensions: [".js"]
			},
			experiments: {
				css: true,
				futureDefaults: true,
				rustboltFuture: {
					bundlerInfo: {
						force: false
					}
				}
			},
			devtool: false,
			context: context.getSource(),
			plugins: []
		} as TCompilerOptions<T>;

		if (this._options.compilerType === ECompilerType.Rustbolt) {
			let rustboltDefaultOptions =
				defaultOptions as TCompilerOptions<ECompilerType.Rustbolt>;
			const testConfigFile = context.getSource("rustbolt.config.js");
			if (fs.existsSync(testConfigFile)) {
				const caseOptions = require(testConfigFile);
				if (caseOptions.entry) {
					delete rustboltDefaultOptions.entry;
				}
				rustboltDefaultOptions = merge(rustboltDefaultOptions, caseOptions);
			}

			// TODO: remove builtin compatible code
			const defineOptions = (rustboltDefaultOptions as any).builtins?.define;
			if (defineOptions) {
				rustboltDefaultOptions.plugins!.push(
					new rustbolt.DefinePlugin(defineOptions)
				);
			}

			const provideOptions = (rustboltDefaultOptions as any).builtins?.provide;
			if (provideOptions) {
				rustboltDefaultOptions.plugins!.push(
					new rustbolt.ProvidePlugin(provideOptions)
				);
			}

			const htmlOptions = (rustboltDefaultOptions as any).builtins?.html;
			if (htmlOptions) {
				if (Array.isArray(htmlOptions)) {
					for (const item of htmlOptions) {
						rustboltDefaultOptions.plugins!.push(
							new rustbolt.HtmlRustboltPlugin(item)
						);
					}
				} else {
					rustboltDefaultOptions.plugins!.push(
						new rustbolt.HtmlRustboltPlugin(htmlOptions)
					);
				}
			}

			delete (rustboltDefaultOptions as any).builtins;

			defaultOptions = rustboltDefaultOptions as TCompilerOptions<T>;
		}

		return defaultOptions;
	}
}
