/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	module: {
		rules: [
			{
				test: /\.(jpe?g|png|gif)$/,
				type: "asset"
			}
		]
	}
};
