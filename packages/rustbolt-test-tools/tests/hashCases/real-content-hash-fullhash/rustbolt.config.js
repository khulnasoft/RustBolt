/** @type {import("@rustbolt/core").Configuration[]} */
module.exports = {
	mode: "production",
	entry: "./index",
	optimization: {
		realContentHash: true
	},
	output: {
		filename: "[fullhash].js"
	}
};
