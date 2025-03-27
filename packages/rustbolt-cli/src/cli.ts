import path from "node:path";
import util from "node:util";
import type {
	RustboltPluginFunction,
	RustboltPluginInstance
} from "@rustbolt/core";
import {
	type Compiler,
	type MultiCompiler,
	type MultiRustboltOptions,
	type MultiStats,
	type RustboltOptions,
	type Stats,
	ValidationError,
	rustbolt
} from "@rustbolt/core";
import * as rustboltCore from "@rustbolt/core";
import { createColors, isColorSupported } from "colorette";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { BuildCommand } from "./commands/build";
import { PreviewCommand } from "./commands/preview";
import { ServeCommand } from "./commands/serve";
import type {
	RustboltBuildCLIOptions,
	RustboltCLIColors,
	RustboltCLILogger,
	RustboltCLIOptions
} from "./types";
import {
	type LoadedRustboltConfig,
	loadExtendedConfig,
	loadRustboltConfig
} from "./utils/loadConfig";
import { normalizeEnv } from "./utils/options";

type Command = "serve" | "build";

export class RustboltCLI {
	colors: RustboltCLIColors;
	program: yargs.Argv;
	constructor() {
		this.colors = this.createColors();
		this.program = yargs();
	}
	async createCompiler(
		options: RustboltBuildCLIOptions,
		rustboltCommand: Command,
		callback?: (e: Error | null, res?: Stats | MultiStats) => void
	) {
		process.env.RUSTBOLT_CONFIG_VALIDATE ??= "loose";
		process.env.WATCHPACK_WATCHER_LIMIT =
			process.env.WATCHPACK_WATCHER_LIMIT || "20";

		let config = await this.loadConfig(options);
		config = await this.buildConfig(config, options, rustboltCommand);

		const isWatch = Array.isArray(config)
			? (config as MultiRustboltOptions).some(i => i.watch)
			: (config as RustboltOptions).watch;

		let compiler: MultiCompiler | Compiler | null;
		try {
			compiler = rustbolt(config, isWatch ? callback : undefined);
		} catch (e) {
			// Aligned with webpack-cli
			// See: https://github.com/webpack/webpack-cli/blob/eea6adf7d34dfbfd3b5b784ece4a4664834f5a6a/packages/webpack-cli/src/webpack-cli.ts#L2394
			if (e instanceof ValidationError) {
				this.getLogger().error(e.message);
				process.exit(2);
			} else if (e instanceof Error) {
				if (typeof callback === "function") {
					callback(e);
				} else {
					this.getLogger().error(e);
				}
				return null;
			}
			throw e;
		}
		return compiler;
	}
	createColors(useColor?: boolean): RustboltCLIColors {
		const shouldUseColor = useColor || isColorSupported;
		return {
			...createColors({ useColor: shouldUseColor }),
			isColorSupported: shouldUseColor
		};
	}
	getLogger(): RustboltCLILogger {
		return {
			error: val =>
				console.error(`[rustbolt-cli] ${this.colors.red(util.format(val))}`),
			warn: val => console.warn(`[rustbolt-cli] ${this.colors.yellow(val)}`),
			info: val => console.info(`[rustbolt-cli] ${this.colors.cyan(val)}`),
			success: val => console.log(`[rustbolt-cli] ${this.colors.green(val)}`),
			log: val => console.log(`[rustbolt-cli] ${val}`),
			raw: val => console.log(val)
		};
	}
	async run(argv: string[]) {
		this.program.showHelpOnFail(false);
		this.program.usage("[options]");
		this.program.scriptName("rustbolt");
		this.program.strictCommands(true).strict(true);
		this.program.middleware(normalizeEnv);
		this.registerCommands();
		await this.program.parseAsync(hideBin(argv));
	}
	async registerCommands() {
		const builtinCommands = [
			new BuildCommand(),
			new ServeCommand(),
			new PreviewCommand()
		];
		for (const command of builtinCommands) {
			command.apply(this);
		}
	}
	async buildConfig(
		item: RustboltOptions | MultiRustboltOptions,
		options: RustboltBuildCLIOptions,
		command: Command
	): Promise<RustboltOptions | MultiRustboltOptions> {
		const isBuild = command === "build";
		const isServe = command === "serve";

		const internalBuildConfig = async (item: RustboltOptions) => {
			if (options.entry) {
				item.entry = {
					main: options.entry.map(x => path.resolve(process.cwd(), x))[0] // Fix me when entry supports array
				};
			}
			// to set output.path
			item.output = item.output || {};
			if (options.outputPath) {
				item.output.path = path.resolve(process.cwd(), options.outputPath);
			}
			if (options.analyze) {
				const { BundleAnalyzerPlugin } = await import(
					"webpack-bundle-analyzer"
				);
				(item.plugins ??= []).push({
					name: "rustbolt-bundle-analyzer",
					apply(compiler: any) {
						new BundleAnalyzerPlugin({
							generateStatsFile: true
						}).apply(compiler);
					}
				});
			}
			if (options.profile) {
				item.profile = true;
			}
			if (process.env.RUSTBOLT_PROFILE) {
				const { applyProfile } = await import("./utils/profile.js");
				await applyProfile(process.env.RUSTBOLT_PROFILE, item);
			}
			// cli --watch overrides the watch config
			if (options.watch) {
				item.watch = options.watch;
			}
			// auto set default mode if user config don't set it
			if (!item.mode) {
				item.mode = isBuild ? "production" : "development";
			}
			// user parameters always has highest priority than default mode and config mode
			if (options.mode) {
				item.mode = options.mode as RustboltOptions["mode"];
			}

			// false is also a valid value for sourcemap, so don't override it
			if (typeof item.devtool === "undefined") {
				item.devtool = isBuild ? "source-map" : "cheap-module-source-map";
			}
			if (isServe) {
				const installed = (item.plugins ||= []).find(
					item => item instanceof rustboltCore.ProgressPlugin
				);
				if (!installed) {
					(item.plugins ??= []).push(new rustboltCore.ProgressPlugin());
				}
			}

			if (typeof item.stats === "undefined") {
				item.stats = { preset: "errors-warnings", timings: true };
			} else if (typeof item.stats === "boolean") {
				item.stats = item.stats ? { preset: "normal" } : { preset: "none" };
			} else if (typeof item.stats === "string") {
				item.stats = {
					preset: item.stats as
						| "normal"
						| "none"
						| "verbose"
						| "errors-only"
						| "errors-warnings"
				};
			}
			if (
				this.colors.isColorSupported &&
				typeof item.stats.colors === "undefined"
			) {
				item.stats.colors = true;
			}
			return item;
		};

		if (Array.isArray(item)) {
			return Promise.all(item.map(internalBuildConfig));
		}
		return internalBuildConfig(item as RustboltOptions);
	}

	async loadConfig(
		options: RustboltCLIOptions
	): Promise<RustboltOptions | MultiRustboltOptions> {
		let loadedConfig = (await loadRustboltConfig(
			options
		)) as NonNullable<LoadedRustboltConfig>;

		if (typeof loadedConfig === "function") {
			let functionResult = loadedConfig(options.argv?.env, options.argv);
			// if return promise we should await its result
			if (
				typeof (functionResult as unknown as Promise<unknown>).then ===
				"function"
			) {
				functionResult = await functionResult;
			}

			loadedConfig = functionResult;

			// Handle extends property for function configs
			if ("extends" in loadedConfig && loadedConfig.extends) {
				// Create a temporary config path for the function result
				const tempConfigPath = path.resolve(
					process.cwd(),
					"rustbolt.config.js"
				);
				loadedConfig = await loadExtendedConfig(
					loadedConfig,
					tempConfigPath,
					process.cwd(),
					options
				);
			}
		}

		if (options.configName) {
			const notFoundConfigNames: string[] = [];

			loadedConfig = options.configName.map((configName: string) => {
				let found: RustboltOptions | undefined;

				if (Array.isArray(loadedConfig)) {
					found = loadedConfig.find(options => options.name === configName);
				} else {
					found =
						(loadedConfig as RustboltOptions).name === configName
							? (loadedConfig as RustboltOptions)
							: undefined;
				}

				if (!found) {
					notFoundConfigNames.push(configName);
				}

				// WARNING: if config is not found, the program will exit
				// so assert here is okay to avoid runtime filtering
				return found!;
			});

			if (notFoundConfigNames.length > 0) {
				this.getLogger().error(
					notFoundConfigNames
						.map(
							configName =>
								`Configuration with the name "${configName}" was not found.`
						)
						.join(" ")
				);
				process.exit(2);
			}
		}

		return loadedConfig;
	}

	isMultipleCompiler(
		compiler: Compiler | MultiCompiler
	): compiler is MultiCompiler {
		return Boolean((compiler as MultiCompiler).compilers);
	}
	isWatch(compiler: Compiler | MultiCompiler): boolean {
		return Boolean(
			this.isMultipleCompiler(compiler)
				? compiler.compilers.some(compiler => compiler.options.watch)
				: compiler.options.watch
		);
	}
}

export type RustboltConfigFn = (
	env: Record<string, any>,
	argv: Record<string, any>
) => RustboltOptions | MultiRustboltOptions;

export type RustboltConfigAsyncFn = (
	env: Record<string, any>,
	argv: Record<string, any>
) => Promise<RustboltOptions | MultiRustboltOptions>;

export type RustboltConfigExport =
	| RustboltOptions
	| MultiRustboltOptions
	| RustboltConfigFn
	| RustboltConfigAsyncFn;

/**
 * This function helps you to autocomplete configuration types.
 * It accepts a Rustbolt config object, or a function that returns a config.
 */
export function defineConfig(config: RustboltOptions): RustboltOptions;
export function defineConfig(
	config: MultiRustboltOptions
): MultiRustboltOptions;
export function defineConfig(config: RustboltConfigFn): RustboltConfigFn;
export function defineConfig(
	config: RustboltConfigAsyncFn
): RustboltConfigAsyncFn;
export function defineConfig(
	config: RustboltConfigExport
): RustboltConfigExport;
export function defineConfig(config: RustboltConfigExport) {
	return config;
}

// Note: use union type will make apply function's `compiler` type to be `any`
export function definePlugin(
	plugin: RustboltPluginFunction
): RustboltPluginFunction;
export function definePlugin(
	plugin: RustboltPluginInstance
): RustboltPluginInstance;
export function definePlugin(plugin: any): any {
	return plugin;
}
