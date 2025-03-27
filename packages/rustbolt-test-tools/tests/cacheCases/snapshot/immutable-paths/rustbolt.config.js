const path = require("path");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	context: __dirname,
	experiments: {
		cache: {
			type: "persistent",
			snapshot: {
				immutablePaths: [path.join(__dirname, "./file.js")]
			}
		}
	}
};
