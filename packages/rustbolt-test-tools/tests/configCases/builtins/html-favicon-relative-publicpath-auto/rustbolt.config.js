const path = require("path");
const { rustbolt } = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	output: {
		publicPath: "auto"
	},
	plugins: [
		new rustbolt.HtmlRustboltPlugin({
			favicon: "favicon.ico"
		})
	]
};
