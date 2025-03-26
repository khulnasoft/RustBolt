/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	mode: "production",
	entry: {
		entry: "./entry"
	},
	module: {
		parser: {
			javascript: {
				dynamicImportMode: "weak"
			}
		}
	}
};
