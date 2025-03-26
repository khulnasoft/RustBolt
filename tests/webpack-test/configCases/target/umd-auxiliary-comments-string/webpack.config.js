/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	output: {
		library: "NamedLibrary",
		libraryTarget: "umd",
		umdNamedDefine: true,
		auxiliaryComment: "test comment"
	},
	node: {
		__dirname: false,
		__filename: false
	}
};
