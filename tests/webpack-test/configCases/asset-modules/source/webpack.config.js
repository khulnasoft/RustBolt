/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	mode: "development",
	module: {
		rules: [
			{
				test: /\.svg$/,
				type: "asset/source"
			}
		]
	}
};
