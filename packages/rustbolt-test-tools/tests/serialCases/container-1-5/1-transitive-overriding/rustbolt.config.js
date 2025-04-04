const { ModuleFederationPlugin } = require("@rustbolt/core").container;

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	optimization: {
		chunkIds: "named",
		moduleIds: "named",
		concatenateModules: false
	},
	output: {
		uniqueName: "1-transitive-overriding"
	},
	plugins: [
		new ModuleFederationPlugin({
			name: "container-no-shared",
			library: { type: "commonjs-module" },
			filename: "container-no-shared.js",
			exposes: ["./a", "./b", "./modules", "./modules-from-remote"],
			remotes: {
				"container-with-shared":
					"../0-transitive-overriding/container-with-shared.js",
				"container-no-shared": "./container-no-shared.js"
			}
		})
	]
};
