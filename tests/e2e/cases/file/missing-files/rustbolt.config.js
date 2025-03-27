const { rustbolt } = require("@rustbolt/core");

module.exports = {
	context: __dirname,
	mode: "development",
	entry: {
		main: "./src/index.js"
	},
	devServer: {
		hot: true
	},
	stats: "none",
	infrastructureLogging: {
		debug: false
	},
	plugins: [
		new rustbolt.HtmlRustboltPlugin({
			template: "./src/index.html"
		})
	],
	watchOptions: {
		poll: 1000
	}
};
