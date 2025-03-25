const { HtmlRustboltPlugin } = require("@rustbolt/core");

module.exports = [
	{
		plugins: [
			new HtmlRustboltPlugin({
				filename: "body-index.html",
				inject: "body"
			})
		]
	},
	{
		plugins: [
			new HtmlRustboltPlugin({
				filename: "head-index.html",
				inject: "head"
			})
		]
	},
	{
		plugins: [
			new HtmlRustboltPlugin({
				filename: "true-blocking-index.html",
				inject: true,
				scriptLoading: "blocking"
			})
		]
	},
	{
		plugins: [
			new HtmlRustboltPlugin({
				filename: "true-defer-index.html",
				inject: true
			})
		]
	},
	{
		plugins: [
			new HtmlRustboltPlugin({
				filename: "false-index.html",
				inject: false
			})
		]
	}
];
