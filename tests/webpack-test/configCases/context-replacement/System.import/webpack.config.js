var path = require("path");
var webpack = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	plugins: [
		new webpack.ContextReplacementPlugin(
			/context-replacement/,
			path.resolve(__dirname, "modules"),
			{
				a: "./module-b"
			}
		)
	]
};
