/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	mode: "development",
	output: {
		assetModuleFilename: "images/file[ext]"
	},
	module: {
		rules: [
			{
				test: /\.png$/,
				type: "asset/resource"
			}
		]
	},
	target: "web"
};
