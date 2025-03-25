const path = require("path");
const webpack = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	resolve: {
		modules: ["...", path.resolve(__dirname, "new-context/modules")]
	},
	plugins: [
		new webpack.ContextReplacementPlugin(
			/context-replacement.e$/,
			"new-context",
			true,
			/^replaced$|^\.\/modules\/rep/
		)
	]
};
