const path = require("path");
const resolve = filename => path.resolve(__dirname, filename);

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	entry: {
		main: "./index.js"
	},
	module: {
		rules: [
			{
				test: resolve("index.js"),
				use: [
					{
						loader: "./test-loader.js"
					}
				]
			}
		]
	}
};
