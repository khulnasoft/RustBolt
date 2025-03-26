const path = require("path");
const { rustbolt } = require("@rustbolt/core");

/**
 * @type {import("@rustbolt/core").Configuration}
 */
module.exports = {
	node: {
		__dirname: false,
		__filename: false
	},
	output: {
		filename: "[name].js"
	},
	plugins: [
		new rustbolt.SourceMapDevToolPlugin({
			test: /\.js/,
			filename: "[file].map",
			sourceRoot: path.join(__dirname, "folder") + "/"
		}),
		new rustbolt.DefinePlugin({
			CONTEXT: JSON.stringify(__dirname)
		}),
		compiler => {
			compiler.hooks.compilation.tap("PLUGIN", compilation => {
				compilation.hooks.afterProcessAssets.tap("PLUGIN", assets => {
					for (const asset of Object.values(assets)) {
						expect(typeof asset.source()).toBe("string");
					}
				});
			});
		}
	]
};
