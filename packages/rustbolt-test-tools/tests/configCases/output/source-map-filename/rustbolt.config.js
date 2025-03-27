/** @type {import("../../../../src/index").RustboltOptions} */
module.exports = {
	entry: {
		main: "./index"
	},
	devtool: "source-map",
	target: "node",
	output: {
		filename: "[name].js",
		sourceMapFilename: "../maps/[name].js.map"
	}
};
