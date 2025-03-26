const path = require("path");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	resolve: {
		modules: [path.resolve(__dirname, "a"), path.resolve(__dirname, "b")]
	}
};
