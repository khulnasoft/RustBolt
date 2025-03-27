/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	mode: "none",
	target: "node",
	output: {
		assetModuleFilename: "[name][ext]"
	},
	module: {
		rules: [
			{
				test: /\.jpg$/,
				type: "asset/resource"
			}
		]
	}
};
