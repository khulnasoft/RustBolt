/** @type {import("../../../../src/index").RustboltOptions} */
module.exports = {
	context: __dirname,
	entry: {
		main: "./index"
	},
	node: {
		__dirname: "mock",
		__filename: "mock"
	}
};
