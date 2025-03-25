const path = require("path");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	resolve: {
		tsConfig: {
			configFile: path.resolve(__dirname, "./tsconfig.json")
		}
	},
	module: {
		rules: [
			{
				test: /index/,
				loader: "./loader.js"
			}
		]
	}
};
