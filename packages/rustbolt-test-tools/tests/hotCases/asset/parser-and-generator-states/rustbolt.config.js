/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	context: __dirname,
	module: {
		rules: [
			{
				test: /\.(svg|png)$/,
				type: "asset"
			}
		]
	}
};
