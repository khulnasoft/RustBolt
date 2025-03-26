/** @type {import('../../..').TDefaultsCaseConfig} */
module.exports = {
	description: "uniqueName",
	options: () => ({
		output: {
			uniqueName: "@@@Hello World!",
			trustedTypes: true
		}
	}),
	diff: e =>
		e.toMatchInlineSnapshot(`
		- Expected
		+ Received

		@@ ... @@
		-     "chunkLoadingGlobal": "webpackChunk_rustbolt_test_tools",
		+     "chunkLoadingGlobal": "webpackChunk_Hello_World_",
		@@ ... @@
		-     "devtoolNamespace": "@rustbolt/test-tools",
		+     "devtoolNamespace": "@@@Hello World!",
		@@ ... @@
		-     "hotUpdateGlobal": "webpackHotUpdate_rustbolt_test_tools",
		+     "hotUpdateGlobal": "webpackHotUpdate_Hello_World_",
		@@ ... @@
		-     "trustedTypes": undefined,
		-     "uniqueName": "@rustbolt/test-tools",
		+     "trustedTypes": Object {
		+       "onPolicyCreationFailure": "stop",
		+       "policyName": "@@@Hello_World_",
		+     },
		+     "uniqueName": "@@@Hello World!",
	`)
};
