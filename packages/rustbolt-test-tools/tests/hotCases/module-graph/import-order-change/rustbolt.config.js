const { rustbolt } = require("@rustbolt/core");

module.exports = {
	node: {
		__dirname: false,
		__filename: false
	},
	module: {
		rules: [
			{
				test: /\.css/,
				type: "javascript/auto",
				use: [rustbolt.CssExtractRustboltPlugin.loader, "css-loader"]
			}
		]
	},
	plugins: [
		new rustbolt.CssExtractRustboltPlugin({
			filename: "bundle.css"
		})
	],
	experiments: {
		css: false
	}
};
