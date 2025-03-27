const { rustbolt } = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	plugins: [new rustbolt.HtmlRustboltPlugin({ template: "index.html" })]
};
