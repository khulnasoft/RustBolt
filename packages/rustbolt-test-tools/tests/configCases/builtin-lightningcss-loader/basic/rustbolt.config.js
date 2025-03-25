/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	module: {
		parser: {
			"css/auto": {
				namedExports: true
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
							unusedSymbols: ["unused"],
							targets: "> 0.2%"
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
