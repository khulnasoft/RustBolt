const { rustbolt } = require("@rustbolt/core");
/**
 * @type {import("@rustbolt/core").Configuration}
 */
module.exports = {
	entry: {
		a: "./a",
		a2: "./a2",
		b: "./b",
		c: "./c",
		main: "./index"
	},
	output: {
		filename: "[name].js"
	},
	optimization: {
		minimize: true,
		minimizer: [
			new rustbolt.SwcJsMinimizerRustboltPlugin({
				test: [/a\d?\.js/],
				exclude: [/a\.js/]
			}),
			new rustbolt.SwcJsMinimizerRustboltPlugin({
				test: [/c\.js/]
			})
		]
	}
};
