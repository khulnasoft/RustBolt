var path = require("path");
var webpack = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	entry: {
		a: "./a",
		b: "./b"
	},
	output: {
		filename: "MyDll.[name].js",
		library: "[name]_[fullhash]"
	},
	plugins: [
		new webpack.DllPlugin({
			path: path.resolve(
				__dirname,
				"../../../js/config/dll-plugin/manifest_without_string_template.json"
			)
		})
	]
};
