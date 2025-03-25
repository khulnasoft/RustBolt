import { foo } from "./foo";

// see issue https://github.com/khulnasoft/rustbolt/issues/5430
it("should compile", () => {
	if (typeof require === "undefined") {
		foo;
	}
});
