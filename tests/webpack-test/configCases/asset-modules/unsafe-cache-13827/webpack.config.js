/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	mode: "development",
	module: {
		rules: [
			{
				dependency: "url",
				type: "asset"
			}
		]
	}
};
