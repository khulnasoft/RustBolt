const webpack = require("@rustbolt/core");
/** @type {import("@rustbolt/core").Configuration[]} */
module.exports = [
	{
		// no hmr
	},
	{
		// with hmr
		plugins: [new webpack.HotModuleReplacementPlugin()]
	}
];
