// TODO: In the future, when rustbolt supports `require.ensure`, this test case needs to be changed.

var webpack = require("@rustbolt/core");
/** @type {import("@rustbolt/core").Configuration[]} */
module.exports = [1, 2, 3, 4].map(n => ({
	name: `${n} chunks`,
	mode: "production",
	entry: "./index",
	output: {
		filename: `bundle${n}.js`
	},
	plugins: [
		new webpack.optimize.LimitChunkCountPlugin({
			maxChunks: n
		})
	],
	stats: {
		chunkModules: true,
		// dependentModules: true,
		chunkRelations: true,
		modules: false,
		chunks: true
	}
}));
