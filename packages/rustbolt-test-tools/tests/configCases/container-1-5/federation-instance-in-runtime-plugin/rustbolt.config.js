const { ModuleFederationPlugin } = require("@rustbolt/core").container;

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	optimization: {
		// concatenateModules: false,
		moduleIds: "named"
	},
	output: {
		filename: "someDir/[name].js",
		chunkFilename: "someDir/[name].js"
	},
	plugins: [
		new ModuleFederationPlugin({
			filename: "someDir/container.js",
			runtimePlugins: ["./plugin.js"]
		})
	]
};
