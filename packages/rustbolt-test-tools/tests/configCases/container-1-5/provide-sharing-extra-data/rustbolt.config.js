const { ModuleFederationPlugin } = require("@rustbolt/core").container;

/** @type {import("@rustbolt/core").Configuration[]} */
module.exports = {
	output: {
		filename: "[name].js",
		uniqueName: "provide-sharing-extra-data"
	},
	plugins: [
		new ModuleFederationPlugin({
			name: "container-provide-sharing-extra-data",
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
