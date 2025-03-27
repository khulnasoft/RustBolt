/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	module: {
		rules: [
			{
				test: /\.css$/,
				type: "css/module",
				generator: {
					exportsOnly: true
				}
			}
		]
	}
};
