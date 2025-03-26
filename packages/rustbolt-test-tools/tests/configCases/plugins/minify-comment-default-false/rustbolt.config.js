const { rustbolt } = require("@rustbolt/core");
/**
 * @type {import("@rustbolt/core").Configuration}
 */
module.exports = {
	entry: {
		a: "./a",
		main: "./index"
	},
	output: {
		filename: "[name].js"
	},
	optimization: {
		minimize: true
	},
	plugins: [new rustbolt.SwcJsMinimizerRustboltPlugin()]
};
