const { rustbolt } = require("@rustbolt/core");

/** @type {function(any, any): import("@rustbolt/core").Configuration[]} */
module.exports = (env, { testPath }) => {
	return {
		externals: [/.*foo.*/],
		externalsType: "module",
		output: {
			module: true,
			chunkFormat: "module",
			filename: "[name].mjs"
		},
		experiments: {
			outputModule: true
		},
		optimization: {
			minimize: true,
			concatenateModules: true
		},
		plugins: [
			new rustbolt.CopyRustboltPlugin({
				patterns: ["./a/**/*", "./_a/**/*"]
			})
		]
	};
};
