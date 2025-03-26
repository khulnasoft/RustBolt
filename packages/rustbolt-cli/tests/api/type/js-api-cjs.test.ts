import rustboltCjsRequire, {
	rustbolt as rustboltCjsNamedRequire
} from "@rustbolt/core";
import assert from "node:assert";

type IsFunction<T> = T extends (...args: any[]) => any ? true : false;

// https://github.com/khulnasoft/rustbolt/issues/8095
describe("js-api-type should be correct when requiring from @rustbolt/core", () => {
	it.concurrent("cjs default require", async () => {
		// const rustbolt = require('@rustbolt/core')
		type Truthy = IsFunction<typeof rustboltCjsRequire>;
		const truthy: Truthy = true;
		truthy;
		assert(rustboltCjsNamedRequire.BannerPlugin);
		assert(typeof rustboltCjsNamedRequire === "function");
		const compiler = rustboltCjsNamedRequire({});
		assert(compiler);
	});

	it.concurrent("cjs named require", async () => {
		// const { rustbolt } = require('@rustbolt/core')
		type Truthy = IsFunction<typeof rustboltCjsNamedRequire>;
		const truthy: Truthy = true;
		truthy;
		assert(rustboltCjsNamedRequire.BannerPlugin);
		assert(typeof rustboltCjsNamedRequire === "function");
		const compiler = rustboltCjsNamedRequire({});
		assert(compiler);
	});

	it.concurrent("rustbolt.default should not exist in cjs require", async () => {
		assert(!(rustboltCjsNamedRequire as any).default);
		assert(!(rustboltCjsRequire as any).default);
	});
});
