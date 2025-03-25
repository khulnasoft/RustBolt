/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	entry: {
		main: "./index"
	},
	target: "node",
	output: {
		filename: "[name].js"
	},
	optimization: {
		splitChunks: false
	}
};
