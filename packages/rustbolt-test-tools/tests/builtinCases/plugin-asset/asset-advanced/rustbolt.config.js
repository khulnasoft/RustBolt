/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	module: {
		rules: [
			{
				test: /\.(png|svg|jpg)$/,
				type: "asset"
			}
		]
	}
};
