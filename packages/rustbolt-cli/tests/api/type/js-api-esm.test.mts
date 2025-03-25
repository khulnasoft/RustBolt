import rustboltEsmDefaultImport, {
	rustbolt as rustboltEsmNamedImport
} from "@rustbolt/core";
import assert from "node:assert";

type IsFunction<T> = T extends (...args: any[]) => any ? true : false;

// https://github.com/khulnasoft/rustbolt/issues/8095
describe("js-api-type should be correct when importing from @rustbolt/core", () => {
	it.concurrent("esm default import", async () => {
		// rustbolt has no default export now
		type Falsy = IsFunction<typeof rustboltEsmDefaultImport>;
		const falsy: Falsy = false;
		falsy;
		assert(rustboltEsmDefaultImport.BannerPlugin);
	});

	it.concurrent("esm named import", async () => {
		type Truthy = IsFunction<typeof rustboltEsmNamedImport>;
		const truthy: Truthy = true;
		truthy;
		assert(rustboltEsmNamedImport.BannerPlugin);
		assert(typeof rustboltEsmNamedImport === "function");
		const compiler = rustboltEsmNamedImport({});
		assert(compiler);
	});

	it.concurrent("rustbolt.default should not exist in esm import", async () => {
		assert(!(rustboltEsmNamedImport as any).default);
		assert(!(rustboltEsmDefaultImport as any).default);
	});
});
