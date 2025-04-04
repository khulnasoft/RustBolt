/** @type {import('../../..').TDefaultsCaseConfig} */
module.exports = {
	description: "library.name.root contains escaped placeholder",
	options: () => ({
		output: {
			library: {
				name: {
					root: ["[\\name\\]", "my[\\name\\]Lib[name]", "[\\name\\]"]
				},
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
		+     "chunkLoadingGlobal": "webpackChunk_name_my_name_Lib_name_",
		@@ ... @@
		-     "devtoolNamespace": "@rustbolt/test-tools",
		+     "devtoolNamespace": "[name].my[name]Lib.[name]",
		@@ ... @@
		-     "enabledLibraryTypes": Array [],
		+     "enabledLibraryTypes": Array [
		+       "var",
		+     ],
		@@ ... @@
		-     "hotUpdateGlobal": "webpackHotUpdate_rustbolt_test_tools",
		+     "hotUpdateGlobal": "webpackHotUpdate_name_my_name_Lib_name_",
		@@ ... @@
		-     "library": undefined,
		+     "library": Object {
		+       "amdContainer": undefined,
		+       "auxiliaryComment": undefined,
		+       "export": undefined,
		+       "name": Object {
		+         "root": Array [
		+           "[\\\\name\\\\]",
		+           "my[\\\\name\\\\]Lib[name]",
		+           "[\\\\name\\\\]",
		+         ],
		+       },
		+       "type": "var",
		+       "umdNamedDefine": undefined,
		+     },
		@@ ... @@
		-     "uniqueName": "@rustbolt/test-tools",
		+     "uniqueName": "[name].my[name]Lib.[name]",
	`)
};
