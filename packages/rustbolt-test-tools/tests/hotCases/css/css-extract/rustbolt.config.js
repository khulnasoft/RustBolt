const { rustbolt } = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	cache: true,
	mode: "development",
	entry: "./index",
	module: {
		rules: [
			{
				test: /\.module.css$/,
				use: [
					{
						loader: rustbolt.CssExtractRustboltPlugin.loader,
						options: {
							emit: false,
							esModule: true
						}
					},
					{
						loader: "css-loader",
						options: {
							modules: {
								namedExport: false
							}
						}
					},
					"./loader.js"
				]
			}
		]
	},
	experiments: {
		css: false
	},
	plugins: [
		new rustbolt.CssExtractRustboltPlugin({
			filename: "[name].css",
			runtime: false
		})
	]
};
