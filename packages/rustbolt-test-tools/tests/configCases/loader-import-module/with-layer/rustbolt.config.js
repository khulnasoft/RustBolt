/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	entry: "./index.js",
	module: {
		rules: [
			{
				test: /\.js/,
				loader: "./loader",
				issuerLayer: "main",
				options: {}
			}
		]
	},
	experiments: {
		layers: true
	}
};
