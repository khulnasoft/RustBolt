const path = require("path");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	snapshot: {
		managedPaths: [path.resolve(__dirname, "node_modules")]
	},
	plugins: [
		compiler => {
			compiler.hooks.done.tap("Test", ({ compilation }) => {
				const fileDeps = Array.from(compilation.fileDependencies);
				expect(fileDeps).toContain(
					path.resolve(__dirname, "node_modules/package/index.js")
				);
				expect(fileDeps).toContain(
					path.resolve(__dirname, "node_modules/package/extra.js")
				);
				expect(fileDeps).toContain(
					path.resolve(__dirname, "node_modules/package/package.json")
				);
				expect(fileDeps).toContain(path.resolve(__dirname, "extra.js"));
				expect(fileDeps).toContain(path.resolve(__dirname, "loader.js"));
				expect(fileDeps).toContain(path.resolve(__dirname, "index.js"));
			});
		}
	],
	module: {
		unsafeCache: false
	}
};
