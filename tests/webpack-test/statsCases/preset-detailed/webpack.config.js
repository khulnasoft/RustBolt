const LogTestPlugin = require("../../helpers/LogTestPlugin");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	mode: "production",
	entry: "./index",
	stats: "detailed",
	infrastructureLogging: {
		level: "log"
	},
	plugins: [new LogTestPlugin()]
};
