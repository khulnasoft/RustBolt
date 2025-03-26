const LogTestPlugin = require("../../helpers/LogTestPlugin");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	mode: "production",
	entry: "./index",
	stats: "errors-only",
	infrastructureLogging: {
		level: "error"
	},
	plugins: [new LogTestPlugin()]
};
