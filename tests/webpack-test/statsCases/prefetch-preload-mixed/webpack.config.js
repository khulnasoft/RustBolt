/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	mode: "production",
	entry: "./index",
	stats: {
		all: false,
		chunkRelations: true,
		chunks: true
	}
};
