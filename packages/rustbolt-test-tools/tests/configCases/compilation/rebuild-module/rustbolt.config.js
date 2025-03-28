const pluginName = "plugin";

class Plugin {
	apply(compiler) {
		let initial = true;
		compiler.hooks.compilation.tap(pluginName, compilation => {
			compilation.hooks.finishModules.tapPromise(pluginName, async modules => {
				modules = [...modules];
				const oldModule = modules.find(item => item.resource.endsWith("a.js"));
				if (!oldModule) {
					throw new Error("module not found");
				}
				if (initial) {
					initial = false;

					expect(oldModule.originalSource().source().includes("a = 1")).toBe(
						true
					);

					const newModule = await new Promise((res, rej) => {
						compilation.rebuildModule(oldModule, function (err, m) {
							if (err) {
								rej(err);
							} else {
								res(m);
							}
						});
					});

					expect(newModule.originalSource().source().includes("a = 2")).toBe(
						true
					);
				}
			});
		});
	}
}

/**@type {import("@rustbolt/core").Configuration}*/
module.exports = {
	module: {
		rules: [
			{
				test: /a\.js$/,
				use: [
					{
						loader: "./loader"
					}
				]
			}
		]
	},
	plugins: [new Plugin()]
};
