/** @typedef {import("@rustbolt/core").Compiler} Compiler */

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	output: {
		webassemblyModuleFilename: "[id].[hash].wasm"
	},
	experiments: {
		asyncWebAssembly: true
	}
};
