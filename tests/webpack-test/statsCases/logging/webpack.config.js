const LogTestPlugin = require("../../helpers/LogTestPlugin");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	mode: "production",
	entry: "./index",
	performance: false,
	module: {
		rules: [
			{
				test: /index\.js$/,
				use: "custom-loader"
			}
		]
	},
	plugins: [new LogTestPlugin(true)],
	stats: {
		colors: true,
		logging: true,
		loggingDebug: "custom-loader",
		loggingTrace: true
	}
};
