const EntryPlugin = require("@rustbolt/core").EntryPlugin;
/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	entry: () => ({}),
	optimization: {
		runtimeChunk: true
	},
	output: {
		filename: "[name].js",
		chunkFilename: "[name].chunk.js"
	},
	target: "web",
	plugins: [
		new EntryPlugin(__dirname, "./fail", "main"),
		new EntryPlugin(__dirname, "./ok", "main"),
		new EntryPlugin(__dirname, "./fail", "main")
	]
};
