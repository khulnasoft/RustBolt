const { rustbolt } = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	entry: {
		a: "./a",
		b: "./b",
		main: "./index"
	},
	output: {
		filename: "[name].js"
	},
	optimization: {
		minimize: true,
		minimizer: [
			new rustbolt.SwcJsMinimizerRustboltPlugin({
				include: [/a\.js/]
			})
		]
	}
};
