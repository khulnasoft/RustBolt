const { SourceMapDevToolPlugin } = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	context: __dirname,
	target: "node",
	entry: {
		main: "./index.js"
	},
	optimization: {
		minimize: true
	},
	plugins: [new SourceMapDevToolPlugin({})],
	devtool: false
};
