/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	mode: "development",
	entry: "./index.js",
	output: {
		filename: "[contenthash].js"
	},
	stats: {
		all: false,
		assets: true
	}
};
