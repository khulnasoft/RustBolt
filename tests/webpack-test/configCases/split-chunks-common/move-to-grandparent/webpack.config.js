/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	entry: {
		main: "./index",
		misc: "./second"
	},
	output: {
		filename: "[name].js"
	},
	optimization: {
		splitChunks: {
			minSize: 0
		}
	}
};
