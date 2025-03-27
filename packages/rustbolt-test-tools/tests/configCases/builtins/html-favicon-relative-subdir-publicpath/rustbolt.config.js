const path = require("path");
const { rustbolt } = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	plugins: [
		new rustbolt.HtmlRustboltPlugin({
			publicPath: "/assets/",
			favicon: "./static/favicon.ico"
		})
	]
};
