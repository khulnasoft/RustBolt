const { rustbolt } = require("@rustbolt/core");

/** @type { import('@rustbolt/core').RustboltOptions } */
module.exports = {
	context: __dirname,
	mode: "development",
	entry: "./src/index.js",
	devServer: {
		hot: true
	},
	stats: "none",
	infrastructureLogging: {
		debug: false
	},
	plugins: [
		new rustbolt.HtmlRustboltPlugin({
			template: "./src/index.html",
			inject: "body"
		})
	],
	watchOptions: {
		poll: 1000
	},
	experiments: {
		css: true
	}
};
