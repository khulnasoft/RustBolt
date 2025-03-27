const { rustbolt } = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	optimization: {
		minimize: true,
		minimizer: [
			new rustbolt.SwcJsMinimizerRustboltPlugin({
				extractComments: true
			})
		]
	}
};
