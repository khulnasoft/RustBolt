const { rustbolt } = require("@rustbolt/core");

/** @type { import('@rustbolt/core').RustboltOptions } */
module.exports = {
	context: __dirname,
	entry: {
		main: [
			// Will trigger the issue.
			'data:text/javascript,import "core-js";',
			"./src/index.css",
			"./src/index.js"
		]
	},
	stats: "none",
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
	devServer: {
		hot: true
	}
};
