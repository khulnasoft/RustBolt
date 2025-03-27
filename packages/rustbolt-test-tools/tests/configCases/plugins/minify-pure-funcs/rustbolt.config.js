const { rustbolt } = require("@rustbolt/core");
/**
 * @type {import("@rustbolt/core").Configuration}
 */
module.exports = {
	optimization: {
		minimize: true
	},
	plugins: [
		new rustbolt.SwcJsMinimizerRustboltPlugin({
			minimizerOptions: {
				compress: {
					pure_funcs: ["__logger.error", "__logger.warn"]
				}
			}
		})
	]
};
