const { ContainerPlugin } = require("@rustbolt/core").container;

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	output: {
		pathinfo: true
	},
	plugins: [
		new ContainerPlugin({
			name: "container",
			filename: "container-file.js",
			library: {
				type: "commonjs-module"
			},
			exposes: {
				"./test": "./test",
				"./test2": ["./init-module", "./test2"],
				".": "./main"
			}
		})
	]
};
