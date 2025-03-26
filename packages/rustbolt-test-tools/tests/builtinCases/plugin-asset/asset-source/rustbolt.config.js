/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	module: {
		rules: [
			{
				test: /\.txt$/,
				type: "asset/source"
			}
		]
	}
};
