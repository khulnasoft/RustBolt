const { rustbolt } = require("@rustbolt/core");

class Plugin {
	apply(compiler) {
		compiler.hooks.thisCompilation.tap("MyPlugin", compilation => {
			compilation.hooks.processAssets.tap(
				{
					name: "MyPlugin",
					stage: compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_HASH
				},
				() => {
					const css = compilation
						.getAssets()
						.find(asset => asset.name.endsWith(".css"));
					expect(css.info.contenthash.length).toBeGreaterThan(0);
				}
			);
		});
	}
}

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	entry: "./index.js",
	target: "web",
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [rustbolt.CssExtractRustboltPlugin.loader, "css-loader"]
			}
		]
	},
	plugins: [
		new rustbolt.CssExtractRustboltPlugin({
			filename: "[name].[contenthash].css"
		}),
		new Plugin()
	],
	experiments: {
		css: false
	}
};
