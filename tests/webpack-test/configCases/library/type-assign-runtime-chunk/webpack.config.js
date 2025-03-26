/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	output: {
		filename: "[name].js",
		library: {
			name: "MyLibraryRuntimeChunk",
			type: "assign"
		}
	},
	target: "web",
	optimization: {
		runtimeChunk: true
	}
};
