const webpack = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	entry: {
		a: { import: "./index.js?a", filename: "[name].js" },
		b: { import: "./index.js?b", filename: "[name].js" },
		c: { import: "./index.js?c", filename: "[name].js" },
		d: { import: "./index.js?d", filename: "[name].js" }
	},
	output: {
		filename: "[name].[contenthash].js"
	},
	plugins: [new webpack.HotModuleReplacementPlugin()]
};
