import { type Compiler, type DevServer, rustbolt } from "@rustbolt/core";
import type { RustboltDevServer as RustboltDevServerType } from "@rustbolt/dev-server";

import type { RustboltCLI } from "../cli";
import type { RustboltCommand } from "../types";
import {
	commonOptions,
	commonOptionsForBuildAndServe,
	ensureEnvObject,
	setBuiltinEnvArg,
	setDefaultNodeEnv
} from "../utils/options";

export class ServeCommand implements RustboltCommand {
	async apply(cli: RustboltCLI): Promise<void> {
		cli.program.command(
			["serve", "server", "s", "dev"],
			"run the rustbolt dev server.",
			yargs =>
				commonOptionsForBuildAndServe(commonOptions(yargs)).options({
					hot: {
						coerce: arg => {
							if (typeof arg === "boolean" || arg === "only") {
								return arg;
							}
							if (arg === "false") {
								return false;
							}
							return true;
						},
						describe: "enables hot module replacement"
					},
					port: {
						type: "number",
						coerce: arg => (Number.isInteger(arg) ? arg : undefined),
						describe: "allows to specify a port to use"
					},
					host: {
						type: "string",
						describe: "allows to specify a hostname to use"
					}
				}),
			async options => {
				setDefaultNodeEnv(options, "development");
				setBuiltinEnvArg(ensureEnvObject(options), "SERVE", true);

				const rustboltOptions = {
					...options,
					argv: {
						...options
					}
				};
				/**
				 * webpack-dev-server will set `process.env.WEBPACK_SERVE` to true
				 * when its module is imported, so we have to lazy load the package
				 * to make sure the envvar is not set on build mode.
				 * when run in serve mode, we have to load the package before config
				 * module is imported so that the envvar `process.env.WEBPACK_SERVE`
				 * got in config module could be `true`.
				 * related issue: https://github.com/khulnasoft/rustbolt/issues/6359
				 */
				const { RustboltDevServer } = await import("@rustbolt/dev-server");

				const compiler = await cli.createCompiler(rustboltOptions, "serve");
				if (!compiler) return;
				const compilers = cli.isMultipleCompiler(compiler)
					? compiler.compilers
					: [compiler];
				const possibleCompilers = compilers.filter(
					(compiler: Compiler) => compiler.options.devServer
				);

				const usedPorts: number[] = [];
				const servers: RustboltDevServerType[] = [];

				/**
				 * Webpack uses an Array of compilerForDevServer,
				 * however according to it's doc https://webpack.js.org/configuration/dev-server/#devserverhot
				 * It should use only the first one
				 *
				 * Choose the one for configure devServer
				 */
				const compilerForDevServer =
					possibleCompilers.length > 0 ? possibleCompilers[0] : compilers[0];

				/**
				 * Rustbolt relies on devServer.hot to enable HMR
				 */
				for (const compiler of compilers) {
					const devServer = (compiler.options.devServer ??= {});
					devServer.hot = options.hot ?? devServer.hot ?? true;
					if (devServer.client !== false) {
						if (devServer.client === true || devServer.client == null) {
							devServer.client = {};
						}
						devServer.client = {
							overlay: {
								errors: true,
								warnings: false
							},
							...devServer.client
						};
					}
				}

				const result = (compilerForDevServer.options.devServer ??= {});

				if (compilerForDevServer.options.experiments.lazyCompilation) {
					const options =
						compilerForDevServer.options.experiments.lazyCompilation;

					const setupMiddlewares = result.setupMiddlewares;
					const lazyCompileMiddleware =
						rustbolt.experiments.lazyCompilationMiddleware(
							compilerForDevServer,
							options
						);
					result.setupMiddlewares = (middlewares, server) => {
						let finalMiddlewares = middlewares;
						if (setupMiddlewares) {
							finalMiddlewares = setupMiddlewares(finalMiddlewares, server);
						}
						return [lazyCompileMiddleware, ...finalMiddlewares];
					};
				}

				/**
				 * Enable this to tell Rustbolt that we need to enable React Refresh by default
				 */
				result.hot = options.hot ?? result.hot ?? true;
				result.host = options.host || result.host;
				result.port = options.port || result.port;
				if (result.client !== false) {
					if (result.client === true || result.client == null) {
						result.client = {};
					}
					result.client = {
						overlay: {
							errors: true,
							warnings: false
						},
						...result.client
					};
				}

				const devServerOptions = result as DevServer;
				if (devServerOptions.port) {
					const portNumber = Number(devServerOptions.port);

					if (!Number.isNaN(portNumber)) {
						if (usedPorts.find(port => portNumber === port)) {
							throw new Error(
								"Unique ports must be specified for each devServer option in your rustbolt configuration. Alternatively, run only 1 devServer config using the --config-name flag to specify your desired config."
							);
						}

						usedPorts.push(portNumber);
					}
				}

				try {
					const server = new RustboltDevServer(devServerOptions, compiler);

					await server.start();

					servers.push(server);
				} catch (error) {
					const logger = cli.getLogger();
					logger.error(error);

					process.exit(2);
				}
			}
		);
	}
}
