const { rustbolt } = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	plugins: [
		new rustbolt.HtmlRustboltPlugin({
			meta: {
				viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
				test: {
					a: "b"
				}
			}
		})
	]
};
