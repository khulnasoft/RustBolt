const path = require("path");

/** @type {import('@rustbolt/cli').Configuration} */
module.exports = {
	mode: "development", // will be override to "production" by "--mode"
	entry: "./entry.js",
	output: {
		clean: true,
		path: path.resolve(__dirname, "dist")
	},
	optimization: {
		nodeEnv: false
	}
};
