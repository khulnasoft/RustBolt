const { rustbolt } = require("@rustbolt/core");
/**
 * @type {import("@rustbolt/core").Configuration}
 */
module.exports = {
	entry: {
		a: "./a.js",
		b: "./b.js",
		main: "./index.js"
	},
	output: {
		filename: "[name].js"
	},
	module: {
		generator: {
			"css/auto": {
				exportsOnly: false
			}
		}
	},
	optimization: {
		minimize: true,
		minimizer: [
			new rustbolt.LightningCssMinimizerRustboltPlugin({
				exclude: [/b\.css/]
			})
		]
	}
};
