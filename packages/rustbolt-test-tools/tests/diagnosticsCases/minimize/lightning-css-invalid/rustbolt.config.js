const { rustbolt } = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	entry: "./index.js",
	target: "web",
	optimization: {
		minimize: true,
		minimizer: [new rustbolt.LightningCssMinimizerRustboltPlugin()]
	},
	experiments: {
		css: true
	}
};
