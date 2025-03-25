// eslint-disable-next-line node/no-unpublished-require
const { ModuleFederationPluginV1: ModuleFederationPlugin } = require("@rustbolt/core").container;

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	output: {
		uniqueName: "2-container-full"
	},
	plugins: [
		new ModuleFederationPlugin({
			name: "main",
			library: { type: "commonjs-module" },
			remotes: {
				containerB: "../1-container-full/container.js",
				self: [
					"var undefined",
					"var (() => { throw new Error(); })()",
					"var { then: (a, b) => b(new Error()) }",
					"./bundle0.js"
				]
			},
			exposes: ["./Self"],
			shared: {
				react: "react",
				"old-react": {
					import: false,
					shareKey: "react",
					requiredVersion: "^2"
				},
				"old-react-singleton": {
					import: false,
					shareKey: "react",
					requiredVersion: "^2",
					singleton: true
				}
			}
		})
	]
};
