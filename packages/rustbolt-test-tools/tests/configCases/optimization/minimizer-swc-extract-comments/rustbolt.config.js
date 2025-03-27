const { SwcJsMinimizerRustboltPlugin } = require("@rustbolt/core");

/**
 * @type {import("@rustbolt/core").Configuration}
 */
module.exports = {
	optimization: {
		minimize: true,
		minimizer: [
			new SwcJsMinimizerRustboltPlugin({
				extractComments: {},
				minimizerOptions: {
					format: {
						comments: "all"
					}
				}
			})
		]
	}
};
