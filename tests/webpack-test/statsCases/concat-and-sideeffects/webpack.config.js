/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	mode: "production",
	entry: "./index",
	stats: {
		all: false,
		modules: true,
		nestedModules: true,
		orphanModules: true,
		optimizationBailout: true
	}
};
