const { ProvideSharedPlugin } = require("@rustbolt/core").sharing;
/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	output: {
		filename: "[name].js"
	},
	optimization: {
		runtimeChunk: "single"
	},
	plugins: [
		new ProvideSharedPlugin({
			provides: ["x"]
		})
	]
};
