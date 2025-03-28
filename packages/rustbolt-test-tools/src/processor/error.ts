import type fs from "node:fs";
import path from "node:path";
import type { StatsError } from "@rustbolt/core";
import merge from "webpack-merge";

import type {
	ECompilerType,
	ITestContext,
	ITestEnv,
	TCompiler,
	TCompilerOptions
} from "../type";
import { SimpleTaskProcessor } from "./simple";

class RustboltStatsDiagnostics {
	constructor(
		public errors: StatsError[],
		public warnings: StatsError[]
	) {}
}

export interface IErrorProcessorOptions<T extends ECompilerType> {
	name: string;
	compilerType: T;
	options?: (
		options: TCompilerOptions<T>,
		context: ITestContext
	) => TCompilerOptions<T>;
	build?: (context: ITestContext, compiler: TCompiler<T>) => Promise<void>;
	check?: (stats: RustboltStatsDiagnostics) => Promise<void>;
}

export class ErrorProcessor<
	T extends ECompilerType
> extends SimpleTaskProcessor<T> {
	constructor(protected _errorOptions: IErrorProcessorOptions<T>) {
		super({
			options: (context: ITestContext): TCompilerOptions<T> => {
				let options = {
					context: path.resolve(__dirname, "../../tests/fixtures/errors"),
					mode: "none",
					devtool: false,
					optimization: {
						minimize: false,
						moduleIds: "named",
						chunkIds: "named"
					},
					experiments: {
						css: true,
						rustboltFuture: {
							bundlerInfo: {
								force: false
							}
						}
					}
				} as TCompilerOptions<T>;
				if (typeof _errorOptions.options === "function") {
					options = merge(options, _errorOptions.options(options, context));
				}
				if (options.mode === "production") {
					if (options.optimization) options.optimization.minimize = true;
					else options.optimization = { minimize: true };
				}
				return options;
			},
			build: _errorOptions.build,
			compilerType: _errorOptions.compilerType,
			name: _errorOptions.name
		});
	}

	async compiler(context: ITestContext) {
		await super.compiler(context);
		const compiler = this.getCompiler(context).getCompiler();
		if (compiler) {
			compiler.outputFileSystem = {
				// CHANGE: rustbolt outputFileSystem `mkdirp` uses option `{ recursive: true }`, webpack's second parameter is alway a callback
				mkdir(
					dir: string,
					maybeOptionOrCallback: unknown,
					maybeCallback: unknown
				) {
					if (typeof maybeOptionOrCallback === "function") {
						maybeOptionOrCallback();
					} else if (typeof maybeCallback === "function") {
						maybeCallback();
					}
				},
				writeFile(file: string, content: string, callback: () => {}) {
					callback();
				},
				stat(file: string, callback: (e: Error) => {}) {
					callback(new Error("ENOENT"));
				},
				mkdirSync() {},
				writeFileSync() {}
			} as unknown as typeof fs;
		}
	}
	async run(env: ITestEnv, context: ITestContext) {
		// do nothing
	}

	async check(env: ITestEnv, context: ITestContext) {
		const compiler = this.getCompiler(context);
		const stats = compiler.getStats();
		env.expect(typeof stats).toBe("object");
		const statsResult = stats!.toJson({ errorDetails: false });
		env.expect(typeof statsResult).toBe("object");
		const { errors, warnings } = statsResult;
		env.expect(Array.isArray(errors)).toBe(true);
		env.expect(Array.isArray(warnings)).toBe(true);

		await this._errorOptions.check?.(
			new RustboltStatsDiagnostics(
				errors as StatsError[],
				warnings as StatsError[]
			)
		);
	}
}
