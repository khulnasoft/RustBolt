/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	entry: {
		main: "./index.js"
	},
	module: {
		rules: [
			{
				test: /\.png/,
				type: "asset/resource"
			}
		]
	}
};
