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
							sassOptions: {
								silenceDeprecations: ["import"]
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
	}
};
