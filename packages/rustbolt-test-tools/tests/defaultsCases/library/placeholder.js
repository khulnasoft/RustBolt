/** @type {import('../../..').TDefaultsCaseConfig} */
module.exports = {
	description: "library contains [name] placeholder",
	options: () => ({
		output: {
			library: ["myLib", "[name]"]
		}
	}),
	diff: e =>
		e.toMatchInlineSnapshot(`
		- Expected
		+ Received

		@@ ... @@
		-         "force": true,
		+         "force": false,
		@@ ... @@
		-     "chunkLoadingGlobal": "webpackChunk_rustbolt_test_tools",
		+     "chunkLoadingGlobal": "webpackChunkmyLib",
		@@ ... @@
		-     "devtoolNamespace": "@rustbolt/test-tools",
		+     "devtoolNamespace": "myLib",
		@@ ... @@
		-     "enabledLibraryTypes": Array [],
		+     "enabledLibraryTypes": Array [
		+       "var",
		+     ],
		@@ ... @@
		-     "hotUpdateGlobal": "webpackHotUpdate_rustbolt_test_tools",
		+     "hotUpdateGlobal": "webpackHotUpdatemyLib",
		@@ ... @@
		-     "library": undefined,
		+     "library": Object {
		+       "amdContainer": undefined,
		+       "auxiliaryComment": undefined,
		+       "export": undefined,
		+       "name": Array [
		+         "myLib",
		+         "[name]",
		+       ],
		+       "type": "var",
		+       "umdNamedDefine": undefined,
		+     },
		@@ ... @@
		-     "uniqueName": "@rustbolt/test-tools",
		+     "uniqueName": "myLib",
	`)
};
