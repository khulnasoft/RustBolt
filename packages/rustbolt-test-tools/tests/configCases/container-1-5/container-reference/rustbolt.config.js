const { ModuleFederationPlugin } = require("@rustbolt/core").container;

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	plugins: [
		new ModuleFederationPlugin({
			remoteType: "var",
			remotes: {
				abc: "ABC",
				def: "DEF"
			}
		})
	]
};
