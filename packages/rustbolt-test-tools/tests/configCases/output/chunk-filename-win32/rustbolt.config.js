const path = require("path");
/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	entry: "./index.js",
	output: {
		chunkFilename: path.win32.join("./", "js/[name].[chunkhash:8].chunk.js")
	}
};
