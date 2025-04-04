import { HashProcessor } from "../processor";
import { BasicCaseCreator } from "../test/creator";
import { ECompilerType, type ITester, type TTestConfig } from "../type";

export type THashCaseConfig = Pick<
	TTestConfig<ECompilerType.Rustbolt>,
	"validate"
>;

class HashCaseCreator<T extends ECompilerType> extends BasicCaseCreator<T> {
	protected describe(
		name: string,
		tester: ITester,
		testConfig: TTestConfig<T>
	) {
		it(`should print correct hash for ${name}`, async () => {
			await tester.prepare();
			await tester.compile();
			await tester.check(this.createEnv(testConfig));
			await tester.resume();
		}, 30000);
	}
}

const creator = new HashCaseCreator({
	clean: true,
	describe: false,
	steps: ({ name }) => [
		new HashProcessor({
			name,
			compilerType: ECompilerType.Rustbolt,
			configFiles: ["rustbolt.config.js", "webpack.config.js"]
		})
	]
});

export function createHashCase(name: string, src: string, dist: string) {
	creator.create(name, src, dist);
}
