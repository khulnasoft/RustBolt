/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	mode: "production",
	entry: {
		index: "./index.js",
		entry: "./entry.js"
	},
	target: "web",
	output: {
		filename: "[name].js"
	},
	externals: ["external"],
	stats: {
		assets: false,
		orphanModules: true,
		optimizationBailout: true
	}
};
