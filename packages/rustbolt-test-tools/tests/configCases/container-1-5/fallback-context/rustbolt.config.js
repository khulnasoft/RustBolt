const { ModuleFederationPlugin } = require("@rustbolt/core").container;

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	entry: "./src/index.js",
	plugins: [
		new ModuleFederationPlugin({
			shared: ["./src/shared.js"]
		})
	]
};
