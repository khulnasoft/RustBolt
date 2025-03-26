/**
 * @type {import('@rustbolt/core').Configuration}
 */
module.exports = {
	context: __dirname,
	output: {
		publicPath: "/",
		assetModuleFilename: "[path][name][ext][query]"
	},
	module: {
		rules: [
			{
				test: /\.png$/,
				type: "asset/resource"
			}
		]
	}
};
