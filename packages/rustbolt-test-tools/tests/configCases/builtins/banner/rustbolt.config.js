const { rustbolt } = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	entry: {
		main: "./index",
		a: "./a"
	},
	target: "node",
	output: {
		filename: "[name].js",
		chunkFilename: "[name].js",
		assetModuleFilename: "[name][ext]"
	},
	devtool: "source-map",
	optimization: {
		chunkIds: "named"
	},
	module: {
		rules: [
			{
				test: /\.png/,
				type: "asset/resource"
			}
		]
	},
	plugins: [
		new rustbolt.BannerPlugin("MMMMMMM"),
		new rustbolt.BannerPlugin({
			banner: "/** MMMMMMM */",
			raw: true,
			footer: true,
			entryOnly: true,
			exclude: [/a\.js/]
		})
	]
};
