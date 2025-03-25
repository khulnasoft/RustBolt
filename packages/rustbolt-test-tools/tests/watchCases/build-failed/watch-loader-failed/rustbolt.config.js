const path = require("path");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	module: {
		rules: [
			{
				test: /.txt$/,
				loader: path.resolve(__dirname, "./loader.js")
			}
		]
	},
	resolve: {
		extensions: ["...", ".txt"]
	}
};
