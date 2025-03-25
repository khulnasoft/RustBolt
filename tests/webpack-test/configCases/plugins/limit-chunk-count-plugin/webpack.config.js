var webpack = require("@rustbolt/core");
/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	node: {
		__dirname: false,
		__filename: false
	},
	entry: "./index.js",
	output: {
		filename: "[name].js"
	},
	plugins: [new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 })]
};
