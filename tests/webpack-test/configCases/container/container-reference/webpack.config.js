const { ContainerReferencePlugin } = require("@rustbolt/core").container;

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	plugins: [
		new ContainerReferencePlugin({
			remoteType: "var",
			remotes: {
				abc: "ABC",
				def: "DEF"
			}
		})
	]
};
