/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	context: __dirname,
	module: {
		rules: [
			{
				test: /\.png$/,
				use: [{ loader: "./loader.js" }],
				type: "asset/resource"
			}
		]
	}
};
