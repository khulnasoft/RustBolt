var webpack = require("@rustbolt/core");
/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	plugins: [
		new webpack.DllReferencePlugin({
			name: "function(id) { return {default: 'ok'}; }",
			scope: "dll",
			content: {
				"./module": {
					id: 1,
					buildMeta: {
						exportsType: "namespace"
					},
					exports: ["default"]
				}
			}
		}),
		new webpack.optimize.ModuleConcatenationPlugin()
	]
};
