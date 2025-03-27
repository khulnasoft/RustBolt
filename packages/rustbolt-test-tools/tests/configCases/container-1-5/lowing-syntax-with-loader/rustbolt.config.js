const { rustbolt } = require("@rustbolt/core");
const { ModuleFederationPlugin } = rustbolt.container;

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [
					{
						loader: "builtin:swc-loader",
						options: {
							jsc: {
								target: "es6"
							}
						}
					}
				]
			}
		]
	},
	optimization: {
		minimize: true,
		minimizer: [
			new rustbolt.SwcJsMinimizerRustboltPlugin({
				minimizerOptions: {
					format: {
						ecma: 6
					}
				}
			})
		]
	},
	plugins: [
		new ModuleFederationPlugin({
			name: "container",
			filename: "container.js",
			library: { type: "commonjs-module" },
			exposes: ["./module"]
		})
	]
};
