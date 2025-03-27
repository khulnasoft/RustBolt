const { rustbolt } = require("@rustbolt/core");

/** @type { import('@rustbolt/core').RustboltOptions } */
module.exports = {
	context: __dirname,
	mode: "development",
	entry: "./src/index.js",
	output: {
		cssFilename: "css/[name].css"
	},
	devtool: false,
	devServer: {
		hot: true
	},
	stats: "none",
	infrastructureLogging: {
		debug: false
	},
	plugins: [new rustbolt.HtmlRustboltPlugin()],
	watchOptions: {
		poll: 1000
	},
	experiments: {
		css: true
	}
};
