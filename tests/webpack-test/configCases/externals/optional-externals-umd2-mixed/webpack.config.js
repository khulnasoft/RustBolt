/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	output: {
		libraryTarget: "umd2"
	},
	externals: {
		external: "external",
		external2: "fs"
	}
};
