/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	target: "web",
	node: false,
	module: {
		rules: [
			{
				test: /\.less$/,
				use: [
					{
						loader: "less-loader",
						options: {
							additionalData: "@background: coral;"
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
