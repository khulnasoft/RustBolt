var path = require("path");
var webpack = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	module: {
		rules: [
			{
				oneOf: [
					{
						test: /\.abc\.js$/,
						loader: "../0-create-dll/g-loader.js",
						options: {
							test: 1
						}
					}
				]
			}
		]
	},
	optimization: {
		moduleIds: "named"
	},
	resolve: {
		extensions: [".js", ".jsx"]
	},
	plugins: [
		new webpack.DllReferencePlugin({
			manifest: require("../../../js/config/dll-plugin/manifest0.json"), // eslint-disable-line node/no-missing-require
			name: "../0-create-dll/dll.js",
			context: path.resolve(__dirname, "../0-create-dll"),
			sourceType: "commonjs2"
		})
	]
};
