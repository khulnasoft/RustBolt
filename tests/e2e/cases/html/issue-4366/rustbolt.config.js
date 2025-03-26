const { rustbolt } = require("@rustbolt/core");

/** @type { import('@rustbolt/core').RustboltOptions } */

module.exports = {
	context: __dirname,
	entry: "./src/index.js",
	stats: "none",
	plugins: [new rustbolt.HtmlRustboltPlugin({ template: "./src/index.html" })]
};
