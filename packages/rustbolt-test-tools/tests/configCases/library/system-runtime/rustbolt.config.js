/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	target: "web",
	mode: "development",
	entry: {
		main: "./index.js"
	},
	output: {
		filename: "[name].js",
		library: {
			type: "system"
		}
	},
	optimization: {
		runtimeChunk: {
			name: "runtime"
		}
	}
};
