const { rustbolt } = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	plugins: [
		new rustbolt.HtmlRustboltPlugin({
			templateContent:
				"<!DOCTYPE html><html><head><title><%= title %></title></head><body></body></html>"
		})
	]
};
