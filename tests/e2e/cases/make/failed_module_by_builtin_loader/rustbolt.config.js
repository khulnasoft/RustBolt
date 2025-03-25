const rustbolt = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	entry: "./src/index.js",
	context: __dirname,
	mode: "development",
	plugins: [new rustbolt.HtmlRustboltPlugin()],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: [/node_modules/],
				include: [/src/],
				loader: "builtin:swc-loader"
			}
		]
	},
	devServer: {
		hot: true
	}
};
