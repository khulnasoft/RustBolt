/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	mode: "development",
	resolve: {
		byDependency: {
			esm: {
				extensions: [".bar", "..."]
			}
		}
	}
};
