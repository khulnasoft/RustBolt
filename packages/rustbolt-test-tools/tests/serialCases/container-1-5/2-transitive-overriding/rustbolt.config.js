const { ModuleFederationPlugin } = require("@rustbolt/core").container;

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	optimization: {
		chunkIds: "named",
		moduleIds: "named",
		concatenateModules: false
	},
	output: {
		uniqueName: "2-transitive-overriding"
	},
	plugins: [
		new ModuleFederationPlugin({
			remoteType: "commonjs-module",
			remotes: {
				"container-no-shared":
					"../1-transitive-overriding/container-no-shared.js"
			},
			shared: {
				"./shared": {
					shareKey: "shared",
					version: "2"
				}
			}
		})
	]
};
