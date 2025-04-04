import { ErrorProcessor, type IErrorProcessorOptions } from "../processor";
import { getSimpleProcessorRunner } from "../test/simple";
import { ECompilerType } from "../type";

let addedSerializer = false;

export type TErrorCaseConfig = Omit<
	IErrorProcessorOptions<ECompilerType.Rustbolt>,
	"name" | "compilerType"
> & {
	description: string;
};

export function createErrorCase(
	name: string,
	src: string,
	dist: string,
	testConfig: string
) {
	if (!addedSerializer) {
		addedSerializer = true;
	}
	const caseConfig = require(testConfig);
	const runner = getSimpleProcessorRunner(src, dist);

	it(caseConfig.description, async () => {
		await runner(
			name,
			new ErrorProcessor({
				name: name,
				compilerType: ECompilerType.Rustbolt,
				...caseConfig
			})
		);
	});
}
