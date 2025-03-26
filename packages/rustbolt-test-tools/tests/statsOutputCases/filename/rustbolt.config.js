const path = require("path");

/** @type {import('@rustbolt/core').Configuration} */
module.exports = {
	entry: "./index",
	output: {
		filename: "[id].xxxx.js",
		chunkFilename: "[id].xxxx.js"
	}
};
