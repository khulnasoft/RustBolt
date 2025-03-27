/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	output: {
		libraryTarget: "umd",
		library: {
			root: ["test", "library"],
			amd: "test-library",
			commonjs: "test-library"
		}
	}
};
