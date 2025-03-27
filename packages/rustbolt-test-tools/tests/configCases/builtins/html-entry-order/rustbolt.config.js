const { rustbolt } = require("@rustbolt/core");

/**@type {import('@rustbolt/core').Configuration} */
module.exports = {
	entry: {
		polyfill: "./polyfill.js",
		main: "./index.js"
	},
	output: {
		filename: "[name].js"
	},
	plugins: [
		new rustbolt.HtmlRustboltPlugin({
			template: "./index.html"
		})
	]
};
