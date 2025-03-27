const path = require("path");
const webpack = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	module: {
		rules: [
			{
				test: /delayed/,
				use: path.resolve(__dirname, "./delayed")
			}
		]
	},
	plugins: [new webpack.AutomaticPrefetchPlugin()]
};
