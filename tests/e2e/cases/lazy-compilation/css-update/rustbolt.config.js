const { rustbolt } = require("@rustbolt/core");

/** @type { import('@rustbolt/core').RustboltOptions } */
module.exports = {
	context: __dirname,
	entry: "./src/index.js",
	mode: "development",
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [rustbolt.CssExtractRustboltPlugin.loader, "css-loader"]
			}
		]
	},
	plugins: [new rustbolt.HtmlRustboltPlugin(), new rustbolt.CssExtractRustboltPlugin()],
	experiments: {
		css: false,
		lazyCompilation: true
	},
	optimization: {
		splitChunks: {
			minSize: 0,
			chunks: "all",
			cacheGroups: {
				styles: {
					test: /\.css$/,
					name: "style.css"
				}
			}
		}
	},
	devServer: {
		hot: true,
		port: 5678
	}
};
