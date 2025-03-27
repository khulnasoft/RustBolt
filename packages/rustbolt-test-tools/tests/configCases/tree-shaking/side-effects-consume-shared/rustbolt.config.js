const { rustbolt } = require("@rustbolt/core");

/**@type {import("@rustbolt/core").Configuration}*/
module.exports = {
	optimization: {
		sideEffects: true
	},
	plugins: [
		new rustbolt.sharing.ConsumeSharedPlugin({
			consumes: {
				"./lib/c.js": {
					singleton: true,
					eager: true
				}
			}
		})
	]
};
