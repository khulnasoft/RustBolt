const { HotModuleReplacementPlugin } = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	output: {
		chunkLoading: "import-scripts",
		enabledChunkLoadingTypes: ["import-scripts"]
	},
	plugins: [new HotModuleReplacementPlugin()]
};
