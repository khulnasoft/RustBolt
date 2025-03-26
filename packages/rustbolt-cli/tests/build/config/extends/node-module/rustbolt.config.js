const path = require("path");

/**
 * @type {import('@rustbolt/core').RustboltOptions}
 */
module.exports = {
	extends: "mock-rustbolt-config",
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, "dist")
	}
};
