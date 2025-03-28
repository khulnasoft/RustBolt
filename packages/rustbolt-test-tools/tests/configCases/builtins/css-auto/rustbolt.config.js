/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	target: "web",
	node: false,
	module: {
		rules: [
			{
				test: /\.css$/,
				type: "css/auto",
				generator: {
					exportsOnly: false
				}
			}
		]
	}
};
