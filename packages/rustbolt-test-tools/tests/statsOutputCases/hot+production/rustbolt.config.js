const { rustbolt } = require("@rustbolt/core");

/** @type {import('@rustbolt/core').Configuration} */
module.exports = {
	entry: {
		main: "./index.js"
	},
	plugins: [new rustbolt.HotModuleReplacementPlugin()],
	mode: "production"
};
