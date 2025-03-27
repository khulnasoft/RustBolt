/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	target: "web",
	node: false,
	module: {
		generator: {
			"css/auto": {
				exportsOnly: false
			}
		},
		rules: [
			{
				test: /\.css$/,
				use: [
					{
						loader: "builtin:lightningcss-loader",
						/** @type {import("@rustbolt/core").LightningcssLoaderOptions} */
						options: {
							targets: ["Edge >= 12"]
						}
					}
				],
				type: "css/auto"
			}
		]
	},
	experiments: {
		css: true
	}
};
