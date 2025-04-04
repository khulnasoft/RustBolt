/** @type {import("@rustbolt/core").RustboltOptions} */
module.exports = {
	entry: {
		main: "./index"
	},
	devtool: "source-map",
	target: "node",
	output: {
		filename: "[name].js",
		chunkFilename: "[contenthash].js",
		sourceMapFilename: "[contenthash]-[file].map"
	}
};
