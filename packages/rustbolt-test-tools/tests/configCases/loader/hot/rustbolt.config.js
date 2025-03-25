const HmrPlugin = require("@rustbolt/core").HotModuleReplacementPlugin;

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	context: __dirname,
	mode: "development",
	plugins: [new HmrPlugin()],
	module: {
		rules: [
			{
				loader: "./loader.js"
			}
		]
	}
};
