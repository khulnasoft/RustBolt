/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	target: "web",
	node: {
		__dirname: false,
		__filename: false
	},
	module: {
		generator: {
			"css/auto": {
				exportsOnly: false
			}
		},
		rules: [
			{
				test: /\.svg$/i,
				issuer: { not: [/\.css$/] },
				use: [{ loader: "file-loader", options: { name: "[name].[ext]" } }],
				type: "javascript/auto"
			},
			{
				test: /\.svg$/,
				issuer: { not: [/\.js$/] },
				type: "asset/inline"
			}
		]
	}
};
