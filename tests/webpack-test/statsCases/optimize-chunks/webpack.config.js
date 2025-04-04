/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	mode: "production",
	entry: "./index",
	stats: {
		ids: true,
		reasons: false,
		modules: false,
		chunks: true,
		chunkRelations: true,
		chunkModules: true,
		dependentModules: true,
		chunkOrigins: true
	}
};
