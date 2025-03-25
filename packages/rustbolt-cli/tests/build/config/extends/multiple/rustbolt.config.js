const path = require("path");

/**
 * @type {import('@rustbolt/core').RustboltOptions}
 */
module.exports = {
	extends: [
		path.resolve(__dirname, "base.rustbolt.config.js"),
		path.resolve(__dirname, "dev.rustbolt.config.js")
	],
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, "dist")
	}
};
