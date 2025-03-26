const { SwcJsMinimizerRustboltPlugin } = require("@rustbolt/core");

/** @type {import("../../../../src/index").RustboltOptions} */
module.exports = {
	plugins: [new SwcJsMinimizerRustboltPlugin()]
};
