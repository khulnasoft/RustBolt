// eslint-disable-next-line node/no-unpublished-require
const { ModuleFederationPluginV1: ModuleFederationPlugin } = require("@rustbolt/core").container;

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	plugins: [
		new ModuleFederationPlugin({
			remoteType: "commonjs-module",
			remotes: {
				containerB: "../1-container-full/container.js"
			},
			shared: ["react"]
		})
	]
};
