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
							additionalData: "$prepended-data: hotpink;"
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
