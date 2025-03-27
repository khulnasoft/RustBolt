/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	context: __dirname,
	module: {
		rules: [
			{
				test: /\.png$/,
				type: "asset/inline"
			}
		]
	}
};
