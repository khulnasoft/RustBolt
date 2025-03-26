const path = require("path");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	resolve: {
		alias: {
			app: [path.join(__dirname, "src/main"), path.join(__dirname, "src/foo")]
		}
	}
};
