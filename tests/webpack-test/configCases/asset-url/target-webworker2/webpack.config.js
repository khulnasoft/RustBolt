/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	mode: "development",
	target: "webworker",
	devtool: false,
	output: {
		assetModuleFilename: "[name][ext]",
		publicPath: "/"
	}
};
