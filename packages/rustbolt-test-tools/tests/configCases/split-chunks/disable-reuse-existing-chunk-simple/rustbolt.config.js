/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	target: "node",
	entry: "./index.js",
	output: {
		filename: "[name].js"
	},
	optimization: {
		splitChunks: {
			minSize: 1,
			cacheGroups: {
				splittedFoo: {
					test: /(foo|foo-2)\.js/,
					priority: 0,
					reuseExistingChunk: false
				}
			}
		}
	}
};
