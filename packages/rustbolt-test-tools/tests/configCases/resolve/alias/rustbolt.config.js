const path = require("path");
/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	entry: "./index.js",
	resolve: {
		alias: {
			"@b": path.resolve(__dirname, "./a"),
			xx: path.resolve(__dirname, "./a"),
			ignored: path.resolve(__dirname, "./a")
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				resolve: {
					alias: {
						ignored: false
					}
				}
			}
		]
	}
};
