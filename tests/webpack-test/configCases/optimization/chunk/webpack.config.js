const webpack = require("@rustbolt/core");
/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	optimization: {
		chunkIds: false
	},
	plugins: [new webpack.ids.DeterministicChunkIdsPlugin()]
};
