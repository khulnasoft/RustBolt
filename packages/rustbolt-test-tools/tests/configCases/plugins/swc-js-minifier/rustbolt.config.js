const { SwcJsMinimizerRustboltPlugin } = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	entry: {
		main: ["./index.js"],
		extract: ["./extract.js"],
		"no-extract": ["./no-extract.js"]
	},
	output: {
		filename: "[name].js"
	},
	plugins: [
		new SwcJsMinimizerRustboltPlugin({
			extractComments: true,
			minimizerOptions: {
				format: {
					comments: false
				}
			},
			include: ["extract.js", "no-extract.js"]
		})
	]
};
