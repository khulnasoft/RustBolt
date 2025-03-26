/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	mode: "production",
	entry: {
		main: "./index",
		sec: "./index2"
	},
	stats: {
		colors: true,
		hash: false,
		entrypoints: true
	},
	performance: {
		hints: "error"
	}
};
