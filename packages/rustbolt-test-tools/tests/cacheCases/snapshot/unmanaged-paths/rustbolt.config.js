const path = require("path");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	context: __dirname,
	experiments: {
		cache: {
			type: "persistent",
			snapshot: {
				managedPaths: [path.join(__dirname, "./test_lib")],
				unmanagedPaths: [path.join(__dirname, "./test_lib/changed.js")]
			}
		}
	}
};
