/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	mode: "production",
	entry: {
		react: "./react"
	},
	optimization: {
		minimize: true,
		chunkIds: "named"
	}
};
