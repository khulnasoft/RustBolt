/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [{ loader: "sass-loader" }],
				type: "css/module"
			}
		]
	}
};
