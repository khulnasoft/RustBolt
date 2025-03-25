import { HotProcessor } from "../processor/hot";
import { HotRunnerFactory } from "../runner";
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
					new HotProcessor({
						name,
						target: target as TTarget,
						compilerType: ECompilerType.Rustbolt,
						configFiles: ["rustbolt.config.js", "webpack.config.js"]
					})
				],
				runner: HotRunnerFactory,
				concurrent: true
			})
		);
	}
	return creators.get(target)!;
}

export function createHotCase(
	name: string,
	src: string,
	dist: string,
	target: TCompilerOptions<ECompilerType.Rustbolt>["target"]
) {
	const creator = getCreator(target);
	creator.create(name, src, dist);
}
