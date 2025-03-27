/** @type {import('@rustbolt/core').Configuration} */
module.exports = {
	context: __dirname,
	entry: {
		main: "./index.js"
	},
	experiments: {
		css: true
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{
						loader: "builtin:lightningcss-loader",
						/** @type {import("@rustbolt/core").LightningcssLoaderOptions} */
						options: {
							unusedSymbols: ["unused"],
							targets: "> 0.2%",
							draft: "xx"
						}
					}
				],
				type: "css/auto"
			}
		]
	}
};
