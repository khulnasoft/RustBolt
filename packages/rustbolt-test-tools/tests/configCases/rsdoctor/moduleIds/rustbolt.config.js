const {
	experiments: { RsdoctorPlugin }
} = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	optimization: {
		concatenateModules: true
	},
	plugins: [
		new RsdoctorPlugin({
			moduleGraphFeatures: ["graph", "ids"],
			chunkGraphFeatures: false
		}),
		{
			apply(compiler) {
				compiler.hooks.compilation.tap("TestPlugin::ModuleIds", compilation => {
					const hooks = RsdoctorPlugin.getCompilationHooks(compilation);
					hooks.moduleIds.tap("TestPlugin::ModuleIds", data => {
						const { moduleIds } = data;
						expect(moduleIds.length).toBe(2);
					});
				});
			}
		}
	]
};
