const LogTestPlugin = require("../../helpers/LogTestPlugin");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	mode: "production",
	entry: "./index",
	profile: true,
	stats: "verbose",
	infrastructureLogging: {
		level: "verbose"
	},
	plugins: [new LogTestPlugin()]
};
