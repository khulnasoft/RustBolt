const path = require("path");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	resolve: {
		modules: ["node_modules", path.resolve(__dirname, "./node_modules")]
	}
};
