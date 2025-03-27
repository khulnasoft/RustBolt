const path = require("path");
const { rustbolt } = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	plugins: [
		new rustbolt.HtmlRustboltPlugin({
			publicPath: "/",
			favicon: "./static/favicon.ico"
		})
	]
};
