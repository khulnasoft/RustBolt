/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	entry: "./index",
	module: {
		rules: [
			{
				test: /\.wat$/,
				loader: "wast-loader",
				type: "webassembly/sync"
			}
		]
	},
	experiments: {
		syncWebAssembly: true
	}
};
