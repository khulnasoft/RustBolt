const { rustbolt } = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	plugins: [
		new rustbolt.HtmlRustboltPlugin({
			templateContent:
				"<!DOCTYPE html><html><body><div><%= env %></div></body></html>",
			templateParameters: {
				env: "production"
			}
		})
	]
};
