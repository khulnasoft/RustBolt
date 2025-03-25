/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	resolve: {
		extensions: ["...", ".ts"]
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: [
					{
						loader: "builtin:swc-loader",
						options: {
							jsc: {
								parser: {
									syntax: "typescript"
								}
							}
						}
					}
				],
				type: "javascript/auto"
			}
		]
	}
};
