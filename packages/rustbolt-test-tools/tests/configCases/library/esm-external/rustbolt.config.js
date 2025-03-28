/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	mode: "development",
	output: {
		libraryTarget: "module",
		iife: false,
		chunkFormat: "module",
		filename: "bundle0.mjs"
	},
	node: false,
	experiments: {
		outputModule: true
	},
	target: "node"
};
