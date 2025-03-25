/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	mode: "development",
	module: {
		rules: [
			{
				test: /\.(png|svg)$/,
				type: "asset/resource"
			},
			{
				test: /\.jpg$/,
				type: "asset/resource"
			}
		]
	}
};
