/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	module: {
		rules: [
			{
				test: /\.svg$/,
				type: "asset/inline"
			}
		]
	}
};
