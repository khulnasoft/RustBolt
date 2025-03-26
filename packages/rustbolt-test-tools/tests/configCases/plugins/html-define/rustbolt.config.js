const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const { rustbolt } = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	plugins: [
		new HtmlPlugin({
			template: "./document.ejs"
		}),
		new rustbolt.DefinePlugin({
			title: JSON.stringify("CUSTOM TITLE")
		})
	]
};
