/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	output: {
		filename: "[name].js"
	},
	optimization: {
		chunkIds: "named",
		splitChunks: {
			hidePathInfo: false,
			minSize: 50,
			maxSize: 100
		}
	}
};
