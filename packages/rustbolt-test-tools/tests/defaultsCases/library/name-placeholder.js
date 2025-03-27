/** @type {import('../../..').TDefaultsCaseConfig} */
module.exports = {
	description: "library.name contains [name] placeholder",
	options: () => ({
		output: {
			library: {
				name: ["my[name]Lib", "[name]", "lib"],
				type: "var"
			}
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
		+     "chunkLoadingGlobal": "webpackChunkmyLib_lib",
		@@ ... @@
		-     "devtoolNamespace": "@rustbolt/test-tools",
		+     "devtoolNamespace": "myLib.lib",
		@@ ... @@
		-     "enabledLibraryTypes": Array [],
		+     "enabledLibraryTypes": Array [
		+       "var",
		+     ],
		@@ ... @@
		-     "hotUpdateGlobal": "webpackHotUpdate_rustbolt_test_tools",
		+     "hotUpdateGlobal": "webpackHotUpdatemyLib_lib",
		@@ ... @@
		-     "library": undefined,
		+     "library": Object {
		+       "amdContainer": undefined,
		+       "auxiliaryComment": undefined,
		+       "export": undefined,
		+       "name": Array [
		+         "my[name]Lib",
		+         "[name]",
		+         "lib",
		+       ],
		+       "type": "var",
		+       "umdNamedDefine": undefined,
		+     },
		@@ ... @@
		-     "uniqueName": "@rustbolt/test-tools",
		+     "uniqueName": "myLib.lib",
	`)
};
