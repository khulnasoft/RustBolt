const { rustbolt } = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	output: {
		publicPath: "/base"
	},
	plugins: [new rustbolt.HtmlRustboltPlugin({})]
};
