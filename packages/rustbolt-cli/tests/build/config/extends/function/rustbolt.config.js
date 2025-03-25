const path = require("path");

/**
 * @type {function(any, any): import('@rustbolt/core').RustboltOptions}
 */
module.exports = (env, argv) => {
	return {
		extends: path.resolve(__dirname, "base.rustbolt.config.js"),
		entry: "./src/index.js",
		output: {
			path: path.resolve(__dirname, "dist")
		}
	};
};
