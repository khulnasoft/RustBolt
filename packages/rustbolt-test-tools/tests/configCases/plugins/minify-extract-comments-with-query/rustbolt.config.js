const { rustbolt } = require("@rustbolt/core");

/**@type {import("@rustbolt/core").Configuration}*/
module.exports = {
	output: {
		filename: "bundle0.js?hash=[contenthash]"
	},
	optimization: {
		minimize: true,
		minimizer: [
			new rustbolt.SwcJsMinimizerRustboltPlugin({
				extractComments: true
			})
		]
	}
};
