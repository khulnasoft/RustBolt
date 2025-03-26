const { rustbolt } = require("@rustbolt/core");

/** @type {import("webpack").Configuration} */
module.exports = {
	plugins: [new rustbolt.CssExtractRustboltPlugin({ ignoreOrder: true })],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [rustbolt.CssExtractRustboltPlugin.loader, "css-loader"]
			}
		]
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				styles: {
					name: "styles",
					chunks: "all",
					test: /\.css$/,
					enforce: true
				}
			}
		}
	},
	experiments: {
		css: false,
		incremental: true
	}
};
