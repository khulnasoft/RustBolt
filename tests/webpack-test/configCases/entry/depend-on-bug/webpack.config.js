/** @typedef {import("@rustbolt/core").Compiler} Compiler */
/** @typedef {import("@rustbolt/core").Compilation} Compilation */
/** @typedef {import("@rustbolt/core").Configuration} Configuration */

/** @type {Configuration} */
/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	entry() {
		return Promise.resolve({
			app: { import: "./app.js", dependOn: ["other-vendors"] },
			page1: { import: "./page1.js", dependOn: ["app"] },
			"other-vendors": "./other-vendors"
		});
	},
	target: "web",
	output: {
		filename: "[name].js"
	}
};
