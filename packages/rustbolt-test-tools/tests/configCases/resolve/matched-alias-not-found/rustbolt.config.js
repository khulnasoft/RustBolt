const path = require("path");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	resolve: {
		alias: {
			m1: path.resolve(__dirname, "node_modules", "m2", "mod.js")
		}
	}
};
