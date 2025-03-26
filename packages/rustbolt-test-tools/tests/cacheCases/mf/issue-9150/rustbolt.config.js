const rustbolt = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	context: __dirname,
	optimization: {
		minimize: false
	},
	experiments: {
		cache: {
			type: "persistent"
		}
	},
	plugins: [
		new rustbolt.container.ModuleFederationPlugin({
			shared: {
				react: {
					requiredVersion: "^19.0.0",
					version: "19.0.0",
					singleton: true,
					eager: true
				}
			}
		})
	]
};
