import { URL } from "node:url";

import type { ECompilerType } from "../../type";
import type {
	IBasicModuleScope,
	TBasicRunnerFile,
	TRunnerRequirer
} from "../type";
import { EsmRunner } from "./esm";

export class NormalRunner<
	T extends ECompilerType = ECompilerType.Rustbolt
> extends EsmRunner<T> {
	protected createBaseModuleScope(): IBasicModuleScope {
		const baseModuleScope = Object.assign(super.createBaseModuleScope(), {
			process,
			global,
			URL,
			Buffer,
			setImmediate
		});
		return baseModuleScope;
	}

	protected createModuleScope(
		requireFn: TRunnerRequirer,
		m: { exports: unknown },
		file: TBasicRunnerFile
	): IBasicModuleScope {
		const moduleScope = super.createModuleScope(requireFn, m, file);
		delete moduleScope.define;
		return moduleScope;
	}
}
