/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	node: {
		__dirname: false,
		__filename: false
	},
	devtool: "source-map",
	optimization: {
		minimize: true
	}
};
