const { rustbolt } = require("@rustbolt/core");

class Plugin {
	apply(compiler) {
		compiler.hooks.compilation.tap("Plugin", compilation => {
			const hooks = rustbolt.HtmlRustboltPlugin.getCompilationHooks(compilation);
			hooks.alterAssetTags.tapPromise("Plugin", async data => {
				for (const tag of data.assetTags.scripts) {
					if (tag.tagName === "script") {
						tag.attributes.defer = true;
					}
				}
			});
		});
	}
}

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	entry: {
		foorBar: "./index.js"
	},
	output: {
		filename: "[name].js"
	},
	plugins: [new rustbolt.HtmlRustboltPlugin({}), new Plugin()]
};
