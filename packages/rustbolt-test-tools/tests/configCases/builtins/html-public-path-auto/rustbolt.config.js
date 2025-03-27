const path = require("path");
const { rustbolt } = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	target: "web",
	externals: {
		path: "require('path')",
		fs: "require('fs')"
	},
	node: {
		__dirname: false
	},
	plugins: [
		new rustbolt.HtmlRustboltPlugin({
			filename: "main_page/index.html"
		})
	]
};
