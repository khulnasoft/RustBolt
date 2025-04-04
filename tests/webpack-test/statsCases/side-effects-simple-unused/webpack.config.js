/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	mode: "production",
	entry: "./index",
	stats: {
		orphanModules: true,
		nestedModules: true,
		usedExports: true,
		reasons: true
	}
};
