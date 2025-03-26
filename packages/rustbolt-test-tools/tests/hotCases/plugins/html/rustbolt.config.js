const { rustbolt } = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	entry: "./index.js",
	plugins: [
		new rustbolt.HtmlRustboltPlugin({
			template: "./index.html"
		})
	],
	node: {
		__dirname: false,
		__filename: false
	}
};
