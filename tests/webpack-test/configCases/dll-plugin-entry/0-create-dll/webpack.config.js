var path = require("path");
var webpack = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	entry: ["."],
	output: {
		filename: "dll.js",
		chunkFilename: "[id].dll.js",
		libraryTarget: "commonjs2"
	},
	plugins: [
		new webpack.DllPlugin({
			path: path.resolve(
				__dirname,
				"../../../js/config/dll-plugin-entry/manifest0.json"
			)
		})
	]
};
