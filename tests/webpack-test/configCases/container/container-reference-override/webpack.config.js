const { ContainerReferencePlugin } = require("@rustbolt/core").container;
const { ProvideSharedPlugin } = require("@rustbolt/core").sharing;

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	plugins: [
		new ContainerReferencePlugin({
			remoteType: "var",
			remotes: {
				abc: "ABC"
			}
		}),
		new ProvideSharedPlugin({
			provides: {
				"./new-test": {
					shareKey: "test",
					version: false
				}
			}
		})
	]
};
