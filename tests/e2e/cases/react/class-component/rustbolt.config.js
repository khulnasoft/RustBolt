const { rustbolt } = require("@rustbolt/core");
const ReactRefreshPlugin = require("@rustbolt/plugin-react-refresh");

/** @type { import('@rustbolt/core').RustboltOptions } */
module.exports = {
	context: __dirname,
	mode: "development",
	entry: "./src/index.jsx",
	resolve: {
		extensions: ["...", ".ts", ".tsx", ".jsx"]
	},
	module: {
		rules: [
			{
				test: /\.jsx$/,
				use: {
					loader: "builtin:swc-loader",
					options: {
						jsc: {
							parser: {
								syntax: "ecmascript",
								jsx: true
							},
							transform: {
								react: {
									runtime: "automatic",
									development: true,
									refresh: true
								}
							}
						}
					}
				}
			}
		]
	},
	plugins: [
		new rustbolt.HtmlRustboltPlugin({ template: "./src/index.html" }),
		new ReactRefreshPlugin()
	],
	devServer: {
		hot: true
	},
	stats: "none",
	infrastructureLogging: {
		debug: false
	},
	watchOptions: {
		poll: 1000
	},
	experiments: {
		css: true
	}
};
