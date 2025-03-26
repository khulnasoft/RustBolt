const { rustbolt } = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	target: "web",
	node: {
		__dirname: false,
		__filename: false
	},
	module: {
		generator: {
			"css/auto": {
				localIdentName: "[path][name]-[local]"
			}
		}
	},
	optimization: {
		minimize: true,
		minimizer: [new rustbolt.LightningCssMinimizerRustboltPlugin()],
		providedExports: true,
		usedExports: true
	},
	experiments: {
		css: true
	}
};
