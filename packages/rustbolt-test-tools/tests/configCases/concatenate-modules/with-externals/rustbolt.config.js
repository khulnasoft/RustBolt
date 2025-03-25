/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	mode: "development",
	entry: {
		main: "./index.js"
	},
	externals: {
		jquery: "var { version: 1 }"
	},
	externalsPresets: {
		node: true
	},
	optimization: {
		concatenateModules: true,
		minimize: false
	}
};
