/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	entry: {
		constructor: "./index"
	},
	target: "web",
	output: {
		filename: "[name].js"
	},
	optimization: {
		runtimeChunk: "single",
		chunkIds: "named"
	}
};
