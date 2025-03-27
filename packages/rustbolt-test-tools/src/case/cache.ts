import { CacheProcessor } from "../processor/cache";
import { CacheRunnerFactory } from "../runner";
import { BasicCaseCreator } from "../test/creator";
import { ECompilerType, type TCompilerOptions } from "../type";

type TTarget = TCompilerOptions<ECompilerType.Rustbolt>["target"];

const creators: Map<
	TTarget,
	BasicCaseCreator<ECompilerType.Rustbolt>
> = new Map();

function getCreator(target: TTarget) {
	if (!creators.has(target)) {
		creators.set(
			target,
			new BasicCaseCreator({
				clean: true,
				describe: true,
				target,
				steps: ({ name, target }) => [
					new CacheProcessor({
						name,
						target: target as TTarget,
						compilerType: ECompilerType.Rustbolt,
						configFiles: ["rustbolt.config.js", "webpack.config.js"]
					})
				],
				runner: CacheRunnerFactory,
				concurrent: true
			})
		);
	}
	return creators.get(target)!;
}

export function createCacheCase(
	name: string,
	src: string,
	dist: string,
	target: TCompilerOptions<ECompilerType.Rustbolt>["target"]
) {
	const creator = getCreator(target);
	creator.create(name, src, dist);
}
