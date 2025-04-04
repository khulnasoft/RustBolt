/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	mode: "development",
	output: {
		assetModuleFilename: "file[ext]"
	},
	module: {
		rules: [
			{
				test: /\.png$/,
				type: "asset",
				generator: {
					publicPath: () => {
						return "assets/";
					}
				}
			}
		]
	}
};
