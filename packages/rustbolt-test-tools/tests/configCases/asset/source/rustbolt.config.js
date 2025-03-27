/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	context: __dirname,
	module: {
		rules: [
			{
				test: /\.txt$/,
				type: "asset/source"
			}
		]
	}
};
