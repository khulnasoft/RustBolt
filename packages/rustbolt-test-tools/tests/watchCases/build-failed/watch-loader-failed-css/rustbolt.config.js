const path = require("path");
const { rustbolt } = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	module: {
		rules: [
			{
				test: /.txt$/,
				type: "javascript/auto",
				use: [
					{
						loader: rustbolt.CssExtractRustboltPlugin.loader
					},
					{
						loader: "css-loader",
						options: {
							modules: {
								namedExport: true,
								exportLocalsConvention: "camel-case-only"
							}
						}
					},
					{
						loader: path.resolve(__dirname, "./loader.js")
					}
				]
			}
		]
	},
	plugins: [new rustbolt.CssExtractRustboltPlugin()],
	experiments: {
		css: false
	},
	resolve: {
		extensions: ["...", ".txt"]
	}
};
