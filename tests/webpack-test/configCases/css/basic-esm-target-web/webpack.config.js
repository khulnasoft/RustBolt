/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	target: "web",
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
