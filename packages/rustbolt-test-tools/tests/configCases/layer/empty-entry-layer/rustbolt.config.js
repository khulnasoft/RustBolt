/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	entry: "./index.js",
	module: {
		rules: [
			{
				issuerLayer: "dark",
				resolve: {
					conditionNames: ["dark", "..."]
				}
			}
		]
	}
};
