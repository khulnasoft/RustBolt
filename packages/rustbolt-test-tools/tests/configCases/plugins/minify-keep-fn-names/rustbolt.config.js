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
				mangle: {
					keep_fnames: true
				}
			}
		})
	]
};
