/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	output: {
		libraryTarget: "umd",
		library: {
			root: "testLibrary[name]",
			amd: "test-library",
			commonjs: "test-library-[name]"
		}
	},
	externals: "module"
};
