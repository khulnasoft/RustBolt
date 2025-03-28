const path = require("path");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	entry: {
		a: "./a",
		b: "./b"
	},
	target: "web",
	output: {
		filename: "[name].js"
	},
	optimization: {
		chunkIds: "named",
		runtimeChunk: "single",
		splitChunks: {
			cacheGroups: {
				dep: {
					chunks: "all",
					test: path.resolve(__dirname, "shared.js"),
					enforce: true
				}
			}
		}
	}
};
