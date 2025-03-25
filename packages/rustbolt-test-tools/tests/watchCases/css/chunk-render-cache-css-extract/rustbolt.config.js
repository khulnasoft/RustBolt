const { rustbolt } = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	entry: {
		ab: "./ab.js",
		ba: "./ba.js"
	},
	output: {
		filename: "[name].js"
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
	plugins: [new rustbolt.CssExtractRustboltPlugin({ ignoreOrder: false })],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [rustbolt.CssExtractRustboltPlugin.loader, "css-loader"],
				type: "javascript/auto"
			}
		]
	},
	experiments: {
		css: false
	}
};
