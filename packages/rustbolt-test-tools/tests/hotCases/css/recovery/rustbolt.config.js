const { CssExtractRustboltPlugin } = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	entry: "./index.js",
	mode: "development",
	devtool: false,
	output: {
		hotUpdateChunkFilename: "[id].hot-update.js"
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{
						loader: CssExtractRustboltPlugin.loader
					},
					"css-loader"
				]
			}
		]
	},
	experiments: {
		css: false
	},
	plugins: [
		new CssExtractRustboltPlugin({
			filename: "[name].css"
		})
	]
};
