/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	node: {
		__dirname: false,
		__filename: false
	},
	// TODO: Rustbolt currently doesnot support layers feature
	// experiments: {
	// 	layers: true
	// },
	devtool: "source-map",
	// entry: {
	// 	main: {
	// 		import: "./index",
	// 		layer: "something"
	// 	}
	// },
	output: {
		devtoolModuleFilenameTemplate(info) {
			return info.absoluteResourcePath;
		}
	}
};
