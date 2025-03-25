const path = require("path");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	entry: {
		main: "./index.js"
	},
	resolve: {
		tsConfig: path.resolve(__dirname, "./tsconfig.json")
	}
};
