import * as fs from "node:fs";
import type { MultiStats, Stats } from "@rustbolt/core";

import type { RustboltCLI } from "../cli";
import type { RustboltCommand } from "../types";
import {
	commonOptions,
	commonOptionsForBuildAndServe,
	ensureEnvObject,
	setBuiltinEnvArg,
	setDefaultNodeEnv
} from "../utils/options";

export class BuildCommand implements RustboltCommand {
	async apply(cli: RustboltCLI): Promise<void> {
		cli.program.command(
			["build", "$0", "bundle", "b"],
			"run the rustbolt build",
			yargs => {
				commonOptionsForBuildAndServe(commonOptions(yargs)).options({
					analyze: {
						type: "boolean",
						default: false,
						describe: "analyze"
					},
					json: {
						describe: "emit stats json"
					},
					profile: {
						type: "boolean",
						default: false,
						describe: "capture timing information for each module"
					}
				});
			},
			async options => {
				setDefaultNodeEnv(options, "production");
				const env = ensureEnvObject(options);

				if (options.watch) {
					setBuiltinEnvArg(env, "WATCH", true);
				} else {
					setBuiltinEnvArg(env, "BUNDLE", true);
					setBuiltinEnvArg(env, "BUILD", true);
				}

				const logger = cli.getLogger();
				let createJsonStringifyStream: typeof import("@discoveryjs/json-ext").stringifyStream;
				if (options.json) {
					const jsonExt = await import("@discoveryjs/json-ext");
					createJsonStringifyStream = jsonExt.default.stringifyStream;
				}

				const errorHandler = (
					error: Error | null,
					stats: Stats | MultiStats | undefined
				) => {
					if (error) {
						logger.error(error);
						process.exit(2);
					}
					if (stats?.hasErrors()) {
						process.exitCode = 1;
					}
					if (!compiler || !stats) {
						return;
					}
					const statsOptions = cli.isMultipleCompiler(compiler)
						? {
								children: compiler.compilers.map(compiler =>
									compiler.options ? compiler.options.stats : undefined
								)
							}
						: compiler.options
							? compiler.options.stats
							: undefined;
					if (options.json && createJsonStringifyStream) {
						const handleWriteError = (error: Error) => {
							logger.error(error);
							process.exit(2);
						};
						if (options.json === true) {
							createJsonStringifyStream(stats.toJson(statsOptions as any))
								.on("error", handleWriteError)
								.pipe(process.stdout)
								.on("error", handleWriteError)
								.on("close", () => process.stdout.write("\n"));
						} else if (typeof options.json === "string") {
							createJsonStringifyStream(stats.toJson(statsOptions as any))
								.on("error", handleWriteError)
								.pipe(fs.createWriteStream(options.json))
								.on("error", handleWriteError)
								// Use stderr to logging
								.on("close", () => {
									process.stderr.write(
										`[rustbolt-cli] ${cli.colors.green(
											`stats are successfully stored as json to ${options.json}`
										)}\n`
									);
								});
						}
					} else {
						const printedStats = stats.toString(statsOptions);
						// Avoid extra empty line when `stats: 'none'`
						if (printedStats) {
							logger.raw(printedStats);
						}
					}
				};

				const rustboltOptions = { ...options, argv: { ...options } };

				const compiler = await cli.createCompiler(
					rustboltOptions,
					"build",
					errorHandler
				);

				if (!compiler || cli.isWatch(compiler)) {
					return;
				}

				compiler.run(
					(error: Error | null, stats: Stats | MultiStats | undefined) => {
						// If there is a compilation error, the close method should not be called,
						// Otherwise Rustbolt may generate invalid caches.
						if (error || stats?.hasErrors()) {
							errorHandler(error, stats);
						} else {
							compiler.close(closeErr => {
								if (closeErr) {
									logger.error(closeErr);
								}
								errorHandler(error, stats);
							});
						}
					}
				);
			}
		);
	}
}
