const path = require("path");
/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	resolve: {
		alias: {
			"#": path.resolve(__dirname, "#")
		},
		fallback: {
			"./b": path.resolve(__dirname, "a")
		}
	}
};
