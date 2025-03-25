/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	entry: "./src/index.js",
	module: {
		rules: [
			{
				test: /\.css$/,
				type: "css/module",
				generator: {
					localIdentName: "[path][name]__[local]"
				}
			}
		]
	}
};
