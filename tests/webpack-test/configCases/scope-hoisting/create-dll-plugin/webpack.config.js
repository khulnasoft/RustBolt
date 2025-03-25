const path = require("path");
var webpack = require("@rustbolt/core");
/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	entry: ["./index.js"],
	plugins: [
		new webpack.DllPlugin({
			path: path.resolve(
				__dirname,
				"../../../js/config/scope-hoisting/create-dll-plugin/manifest.json"
			)
		}),
		new webpack.optimize.ModuleConcatenationPlugin()
	]
};
