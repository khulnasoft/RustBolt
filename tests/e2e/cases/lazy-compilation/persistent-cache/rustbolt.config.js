const { rustbolt } = require("@rustbolt/core");

/** @type { import('@rustbolt/core').RustboltOptions } */
module.exports = {
	context: __dirname,
	entry: {
		main: ["./src/component.js", "./src/index.js"]
	},
	stats: "none",
	mode: "production",
	plugins: [new rustbolt.HtmlRustboltPlugin()],
	cache: true,
	experiments: {
		lazyCompilation: true,
		cache: {
			type: "persistent"
		}
	},
	devServer: {
		hot: true
	}
};
