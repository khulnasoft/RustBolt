/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	mode: "development",
	output: {
		chunkFilename: "js/chunks/c.js"
	},
	devtool: "source-map",
	externals: ["source-map"],
	externalsType: "commonjs"
};
