/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	target: "node",
	mode: "development",
	experiments: {
		outputModule: true,
		css: true
	},
	output: {
		module: true,
		chunkFormat: "module"
	}
};
