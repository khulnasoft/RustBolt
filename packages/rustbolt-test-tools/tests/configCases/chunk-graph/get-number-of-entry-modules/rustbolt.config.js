class Plugin {
	/**
	 * @param {import("@rustbolt/core").Compiler} compiler
	 */
	apply(compiler) {
		compiler.hooks.compilation.tap("Test", compilation => {
			compilation.hooks.processAssets.tap("Test", () => {
				for (const chunk of compilation.chunks) {
					const num = compilation.chunkGraph.getNumberOfEntryModules(chunk);
					const entryModules =
						compilation.chunkGraph.getChunkEntryModulesIterable(chunk);
					expect(Array.from(entryModules)).toHaveLength(num);
				}
			});
		});
	}
}

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	target: "web",
	node: false,
	entry: {
		main: "./foo.js",
		multi: ["./bar.js", "./baz.js"]
	},
	output: {
		filename: "[name].js"
	},
	optimization: {
		sideEffects: false
	},
	plugins: [new Plugin()]
};
