const { CopyRustboltPlugin } = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	entry: "./index.js",
	output: {
		library: {
			type: "commonjs"
		}
	},
	externals: {
		lodash: {
			commonjs: "./lodash.js"
		}
	},
	plugins: [
		new CopyRustboltPlugin({
			patterns: ["./lodash.js"]
		})
	]
};
