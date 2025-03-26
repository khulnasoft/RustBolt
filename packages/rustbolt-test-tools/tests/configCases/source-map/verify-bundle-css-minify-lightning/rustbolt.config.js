const { rustbolt } = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	target: "web",
	node: false,
	module: {
		generator: {
			"css/auto": {
				exportsOnly: false
			}
		}
	},
	devtool: "source-map",
	optimization: {
		minimize: true,
		minimizer: [new rustbolt.LightningCssMinimizerRustboltPlugin()]
	},
	externals: ["source-map"],
	externalsType: "commonjs"
};
