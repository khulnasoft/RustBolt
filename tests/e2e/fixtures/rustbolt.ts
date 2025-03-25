import path from "node:path";
import type { Fixtures, PlaywrightTestArgs } from "@playwright/test";
import {
	type Compiler,
	type Configuration,
	rustbolt,
	type RustboltOptions as RustboltConfig,
	experiments
} from "@rustbolt/core";
import { RustboltDevServer } from "@rustbolt/dev-server";
import WebpackDevServer from "webpack-dev-server";
import type { PathInfoFixtures } from "./pathInfo";

class Rustbolt {
	private wds: boolean;
	private config: RustboltConfig;
	projectDir: string;
	compiler: Compiler;
	devServer: RustboltDevServer | WebpackDevServer;
	private onDone: Array<() => void> = [];
	constructor(
		projectDir: string,
		wds: boolean,
		handleRustboltConfig: (config: Configuration) => Configuration
	) {
		this.wds = wds;

		const configPath = path.resolve(projectDir, "rustbolt.config.js");
		this.config = handleRustboltConfig(require(configPath));
		delete require.cache[configPath];
		const compiler = rustbolt(this.config);

		this.projectDir = projectDir;
		this.compiler = compiler;
		this.compiler.hooks.done.tap("rustbolt_fixture", () => {
			const onDone = this.onDone;
			this.onDone = [];
			for (const item of onDone) {
				item();
			}
		});
		const DevServerConstructor = this.wds ? WebpackDevServer : RustboltDevServer;
		if (compiler.options.experiments.lazyCompilation) {
			const middleware = experiments.lazyCompilationMiddleware(compiler, compiler.options.experiments.lazyCompilation)
			compiler.options.devServer ??= {};
			const setupMiddlewares = compiler.options.devServer.setupMiddlewares;
			compiler.options.devServer.setupMiddlewares = (middlewares, server) => {
				const old = setupMiddlewares ? setupMiddlewares(middlewares, server) : middlewares;
				return [middleware, ...old]
			}
		}
		this.devServer = new DevServerConstructor(
			compiler.options.devServer ?? ({} as any),
			compiler
		);
	}

	// waiting for build done, not hmr done
	async waitingForBuild() {
		if (!this.compiler.watching?.running) {
			return;
		}

		return new Promise<void>(resolve => {
			this.onDone.push(resolve);
		});
	}

	async reboot() {
		await new Promise<void>((res, rej) => {
			this.compiler.close(function (err) {
				if (err) {
					rej(err);
				} else {
					res();
				}
			});
		});
		await this.devServer.stop();

		const compiler = rustbolt(this.config);
		compiler.hooks.done.tap("rustbolt_fixture", () => {
			const onDone = this.onDone;
			this.onDone = [];
			for (const item of onDone) {
				item();
			}
		});
		const DevServerConstructor = this.wds ? WebpackDevServer : RustboltDevServer;

		if (compiler.options.experiments.lazyCompilation) {
			const middleware = experiments.lazyCompilationMiddleware(compiler, compiler.options.experiments.lazyCompilation)
			compiler.options.devServer ??= {};
			const setupMiddleware = compiler.options.devServer.setupMiddlewares;
			compiler.options.devServer.setupMiddlewares = (middlewares, server) => {
				const old = setupMiddleware ? setupMiddleware(middlewares, server) : middlewares;
				return [middleware, ...old]
			}
		}
		this.devServer = new DevServerConstructor(
			compiler.options.devServer ?? ({} as any),
			compiler
		);
		this.compiler = compiler;

		await this.devServer.start();
		await this.waitingForBuild();
	}
}

export type RustboltOptions = {
	defaultRustboltConfig: {
		handleConfig(config: Configuration): Configuration;
	};
};

export type RustboltFixtures = {
	rustbolt: Rustbolt;
};

export const rustboltFixtures = (
	wds: boolean
): Fixtures<
	RustboltOptions & RustboltFixtures,
	PlaywrightTestArgs & PathInfoFixtures
> => {
	return {
		defaultRustboltConfig: [{ handleConfig: c => c }, { option: true }],
		rustbolt: [
			async ({ page, pathInfo, defaultRustboltConfig }, use, { workerIndex }) => {
				const { tempProjectDir } = pathInfo;
				const port = 8000 + workerIndex;
				const rustbolt = new Rustbolt(tempProjectDir, wds, config => {
					// rewrite port
					if (!config.devServer) {
						config.devServer = {};
					}
					config.devServer.port = port;

					// set default context
					if (!config.context) {
						config.context = tempProjectDir;
					}

					return defaultRustboltConfig.handleConfig(config);
				});
				await rustbolt.devServer.start();

				await rustbolt.waitingForBuild();
				await page.goto(`http://localhost:${port}`);

				await use(rustbolt);

				await rustbolt.devServer.stop();
			},
			{
				auto: true
			}
		]
	};
};
