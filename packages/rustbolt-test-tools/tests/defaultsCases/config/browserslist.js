const path = require("path");
/** @type {import('../../..').TDefaultsCaseConfig} */
module.exports = {
	description: "browserslist",
	options: context => ({
		context: path.resolve(context.getSource(), "./browserslist")
	}),
	diff: e =>
		e.toMatchInlineSnapshot(`
		- Expected
		+ Received

		@@ ... @@
		-   "context": "<cwd>",
		+   "context": "<cwd>/tests/fixtures/browserslist",
		@@ ... @@
		-       "arrowFunction": true,
		-       "asyncFunction": true,
		-       "bigIntLiteral": true,
		-       "const": true,
		-       "destructuring": true,
		+       "arrowFunction": false,
		+       "asyncFunction": false,
		+       "bigIntLiteral": false,
		+       "const": false,
		+       "destructuring": false,
		@@ ... @@
		-       "dynamicImport": undefined,
		-       "dynamicImportInWorker": undefined,
		-       "forOf": true,
		-       "globalThis": undefined,
		-       "module": undefined,
		-       "nodePrefixForCoreModules": true,
		-       "optionalChaining": true,
		-       "templateLiteral": true,
		+       "dynamicImport": false,
		+       "dynamicImportInWorker": false,
		+       "forOf": false,
		+       "globalThis": false,
		+       "module": false,
		+       "nodePrefixForCoreModules": false,
		+       "optionalChaining": false,
		+       "templateLiteral": false,
		@@ ... @@
		-     "chunkLoadingGlobal": "webpackChunk_rustbolt_test_tools",
		+     "chunkLoadingGlobal": "webpackChunkbrowserslist_test",
		@@ ... @@
		-     "devtoolNamespace": "@rustbolt/test-tools",
		+     "devtoolNamespace": "browserslist-test",
		@@ ... @@
		-       "arrowFunction": true,
		-       "asyncFunction": true,
		-       "bigIntLiteral": true,
		-       "const": true,
		-       "destructuring": true,
		+       "arrowFunction": false,
		+       "asyncFunction": false,
		+       "bigIntLiteral": false,
		+       "const": false,
		+       "destructuring": false,
		@@ ... @@
		-       "dynamicImport": undefined,
		-       "dynamicImportInWorker": undefined,
		-       "forOf": true,
		-       "globalThis": undefined,
		-       "module": undefined,
		-       "nodePrefixForCoreModules": true,
		-       "optionalChaining": true,
		-       "templateLiteral": true,
		+       "dynamicImport": false,
		+       "dynamicImportInWorker": false,
		+       "forOf": false,
		+       "globalThis": false,
		+       "module": false,
		+       "nodePrefixForCoreModules": false,
		+       "optionalChaining": false,
		+       "templateLiteral": false,
		@@ ... @@
		-     "hotUpdateGlobal": "webpackHotUpdate_rustbolt_test_tools",
		+     "hotUpdateGlobal": "webpackHotUpdatebrowserslist_test",
		@@ ... @@
		-     "uniqueName": "@rustbolt/test-tools",
		+     "uniqueName": "browserslist-test",
		@@ ... @@
		-       "<cwd>",
		+       "<cwd>/tests/fixtures/browserslist",
		@@ ... @@
		-   "target": "web",
		+   "target": "browserslist",
	`)
};
