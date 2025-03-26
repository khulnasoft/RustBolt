const { DefinePlugin } = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	mode: "development",
	devtool: "source-map",
	resolve: {
		extensions: ["...", ".jsx"]
	},
	module: {
		rules: [
			{
				test: /a\.jsx$/,
				use: [
					{
						loader: "builtin:swc-loader",
						options: {
							sourceMap: true
						}
					},
					"./prev-loader"
				]
			}
		]
	},
	plugins: [
		new DefinePlugin({
			CONTEXT: JSON.stringify(__dirname)
		})
	]
};
