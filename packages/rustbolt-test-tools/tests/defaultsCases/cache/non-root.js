const path = require("path");
/** @type {import('../../..').TDefaultsCaseConfig} */
module.exports = {
	description: "non-root directory",
	options: () => ({
		cache: {
			type: "filesystem"
		}
	}),
	cwd: path.resolve(__dirname, "../../fixtures"),
	diff: e =>
		e.toMatchInlineSnapshot(`
		- Expected
		+ Received

		@@ ... @@
		-   "cache": false,
		-   "context": "<cwd>",
		+   "cache": Object {
		+     "type": "filesystem",
		+   },
		+   "context": "<cwd>/tests/fixtures",
		@@ ... @@
		-     "chunkLoadingGlobal": "webpackChunk_rustbolt_test_tools",
		+     "chunkLoadingGlobal": "webpackChunk",
		@@ ... @@
		-     "devtoolNamespace": "@rustbolt/test-tools",
		+     "devtoolNamespace": "",
		@@ ... @@
		-     "hotUpdateGlobal": "webpackHotUpdate_rustbolt_test_tools",
		+     "hotUpdateGlobal": "webpackHotUpdate",
		@@ ... @@
		-     "path": "<cwd>/dist",
		+     "path": "<cwd>/tests/fixtures/dist",
		@@ ... @@
		-     "uniqueName": "@rustbolt/test-tools",
		+     "uniqueName": "",
		@@ ... @@
		-       "<cwd>",
		+       "<cwd>/tests/fixtures",
	`)
};
