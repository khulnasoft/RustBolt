/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	mode: "development",
	target: "web",
	devtool: false,
	output: {
		assetModuleFilename: "[name][ext]",
		publicPath: "/path2/"
	}
};
