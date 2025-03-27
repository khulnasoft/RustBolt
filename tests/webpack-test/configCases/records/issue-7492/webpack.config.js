var path = require("path");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	entry: "./index",
	recordsInputPath: path.resolve(__dirname, "records.json"),
	output: {
		chunkFilename: "[name]-[chunkhash].js"
	},
	optimization: {
		splitChunks: {
			minSize: 0
		}
	}
};
