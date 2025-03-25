const { rustbolt } = require("@rustbolt/core");
/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	devtool: "source-map",
	target: "web",
	node: false,
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: ["postcss-pxtorem"]
							}
						}
					}
				],
				type: "css/auto",
				generator: {
					exportsOnly: false
				}
			}
		]
	},
	plugins: [
		new rustbolt.DefinePlugin({
			CONTEXT: JSON.stringify(__dirname)
		})
	]
};
