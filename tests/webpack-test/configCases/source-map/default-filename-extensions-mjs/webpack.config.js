/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	mode: "development",
	output: {
		filename: "bundle0.mjs"
	},
	node: {
		__dirname: false,
		__filename: false
	},
	devtool: "source-map"
};
