/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	mode: "development",
	devtool: false,
	module: {
		rules: [
			{
				dependency: "url",
				type: "asset",
				generator: {
					dataUrl: {
						encoding: false
					}
				}
			}
		]
	},
	target: "web"
};
