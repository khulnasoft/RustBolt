const { CopyRustboltPlugin } = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	entry: "./index.js",
	output: {
		library: {
			type: "umd"
		}
	},
	externalsType: "umd",
	externals: {
		lodash: {
			root: "./lodash.js",
			commonjs: "./lodash.js",
			commonjs2: "./lodash.js"
		}
	},
	plugins: [
		new CopyRustboltPlugin({
			patterns: ["./lodash.js"]
		})
	]
};
