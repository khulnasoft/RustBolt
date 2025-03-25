const { ModuleFederationPlugin } = require("@rustbolt/core").container;

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	output: {
		filename: "[name].js",
		uniqueName: "share-strategy"
	},
	plugins: [
		new ModuleFederationPlugin({
			shareStrategy: "loaded-first",
			shared: {
				react: {
					version: false,
					requiredVersion: false,
					singleton: true,
					strictVersion: false,
					version: "0.1.2"
				}
			}
		})
	]
};
