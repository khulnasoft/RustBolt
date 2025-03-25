const { CopyRustboltPlugin } = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	entry: "./index.js",
	output: {
		libraryTarget: "umd"
	},
	externals: {
		lodash: {
			root: "./lodash.js",
			commonjs: "./lodash.js",
			commonjs2: "./lodash.js"
		}
	},
	externalsType: "commonjs",
	plugins: [
		new CopyRustboltPlugin({
			patterns: ["./lodash.js"]
		})
	]
};
