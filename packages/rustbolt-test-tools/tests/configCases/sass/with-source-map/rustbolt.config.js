const { rustbolt } = require("@rustbolt/core");
/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	target: "web",
	node: false,
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [
					{
						loader: "sass-loader",
						options: {
							// use legacy API to generate source maps
							api: "legacy",
							sassOptions: {
								silenceDeprecations: ["legacy-js-api"]
							}
						}
					}
				],
				type: "css",
				generator: {
					exportsOnly: false
				}
			}
		]
	},
	devtool: "source-map",
	plugins: [
		new rustbolt.DefinePlugin({
			CONTEXT: JSON.stringify(__dirname)
		})
	],
	experiments: {
		css: true
	}
};
