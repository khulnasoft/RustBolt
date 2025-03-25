const { rustbolt } = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	target: "web",
	node: false,
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					rustbolt.CssExtractRustboltPlugin.loader,
					"css-loader",
					{
						loader: "builtin:lightningcss-loader",
						/** @type {import("@rustbolt/core").LightningcssLoaderOptions} */
						options: {
							targets: ["Edge >= 12"]
						}
					},
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: ["postcss-pxtorem"]
							}
						}
					}
				],
				type: "javascript/auto"
			}
		]
	},
	plugins: [
		new rustbolt.CssExtractRustboltPlugin({
			filename: "bundle0.css"
		})
	],
	experiments: {
		css: true
	}
};
