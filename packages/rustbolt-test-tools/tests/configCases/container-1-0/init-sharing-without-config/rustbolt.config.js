const { ModuleFederationPluginV1: ModuleFederationPlugin } =
	require("@rustbolt/core").container;

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	plugins: [new ModuleFederationPlugin({})]
};
