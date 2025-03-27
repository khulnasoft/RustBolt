/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	target: "web",
	entry: "./index.mjs",
	performance: {
		hints: false
	},
	optimization: {
		minimize: false
	}
};
