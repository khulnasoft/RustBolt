const path = require("path");
const { rustbolt } = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	output: {
		publicPath: "auto"
	},
	plugins: [
		new rustbolt.HtmlRustboltPlugin({
			favicon: path.resolve(__dirname, "favicon.ico")
		})
	]
};
