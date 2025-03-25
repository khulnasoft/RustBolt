const path = require("path");

/**
 * @type {import('@rustbolt/core').RustboltOptions}
 */
module.exports = {
	extends: path.resolve(__dirname, "core.rustbolt.config.js"),
	output: {
		filename: "base.bundle.js"
	}
};
