const { ContainerPlugin } = require("@rustbolt/core").container;
const { ConsumeSharedPlugin } = require("@rustbolt/core").sharing;

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	plugins: [
		new ContainerPlugin({
			name: "container",
			filename: "container-file.js",
			library: {
				type: "commonjs-module"
			},
			exposes: {
				"./test": "./test"
			}
		}),
		new ConsumeSharedPlugin({
			consumes: {
				"./value": {
					shareKey: "value"
				}
			}
		})
	]
};
