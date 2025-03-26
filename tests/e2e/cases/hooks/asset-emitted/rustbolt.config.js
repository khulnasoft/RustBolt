const { rustbolt } = require("@rustbolt/core");

module.exports = {
	entry: {
		main: "./src/index.js"
	},
	mode: "development",
	plugins: [
		new rustbolt.HtmlRustboltPlugin({
			template: "./src/index.html"
		}),
		function test(compiler) {
			compiler.assets = [];
			compiler.hooks.assetEmitted.tap("test", name => {
				if (name.includes(".hot-update.")) {
					return;
				}
				compiler.assets.push(name);
			});
		}
	],
	optimization: {
		chunkIds: "named"
	},
	output: { clean: true }
};
