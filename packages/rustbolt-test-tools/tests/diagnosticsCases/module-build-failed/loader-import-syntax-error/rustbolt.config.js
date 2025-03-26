/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	entry: "./index.js",
	module: {
		rules: [
			{
				test: /index\.js/,
				loader: "./loader",
				options: {}
			}
		]
	}
};
