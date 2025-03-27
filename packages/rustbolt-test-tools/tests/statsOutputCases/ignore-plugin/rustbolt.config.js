const rustbolt = require("@rustbolt/core");

/** @type {import('@rustbolt/core').Configuration} */
module.exports = {
	entry: "./index",
	stats: {
		all: false,
		modules: true
	},
	plugins: [
		new rustbolt.IgnorePlugin({
			checkResource: (resource, request) => {
				if (resource.includes("zh") || resource.includes("globalIndex")) {
					return true;
				}
				return false;
			}
		})
	]
};
