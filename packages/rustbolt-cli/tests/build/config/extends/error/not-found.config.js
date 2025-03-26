const path = require("path");

/**
 * @type {import('@rustbolt/core').RustboltOptions}
 */
module.exports = {
	extends: path.resolve(__dirname, "non-existent-config.js"),
	entry: "./src/index.js"
};
