/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	mode: "development",
	output: {
		library: "mylibrary"
	},
	node: {
		__dirname: false,
		__filename: false
	},
	devtool: "cheap-source-map"
};
