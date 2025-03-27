const { SplitChunksPlugin } = require("@rustbolt/core").optimize;

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	entry: {
		vendor: ["./a"],
		main: "./index"
	},
	target: "web",
	output: {
		filename: "[name].js"
	},
	optimization: {
		splitChunks: false
	},
	plugins: [new SplitChunksPlugin()]
};
