const { rustbolt } = require("@rustbolt/core");
const { CssExtractRustboltPlugin, HtmlRustboltPlugin } = rustbolt;

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	output: {
		publicPath: "http://cdn.com/",
		crossOriginLoading: "anonymous"
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [CssExtractRustboltPlugin.loader, "css-loader"]
			}
		]
	},
	experiments: {
		css: false
	},
	plugins: [
		new CssExtractRustboltPlugin(),
		new HtmlRustboltPlugin({
			minify: false,
			template: "./index.html",
			title: "i am title",
			meta: {
				"meta-name": "meta-value"
			},
			inject: false,
			favicon: "./favicon.ico",
			templateParameters: {
				foo: "bar"
			}
		})
	]
};
