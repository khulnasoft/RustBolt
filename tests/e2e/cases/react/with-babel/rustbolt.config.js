const { rustbolt } = require("@rustbolt/core");
const ReactRefreshPlugin = require("@rustbolt/plugin-react-refresh");

/** @type { import('@rustbolt/core').RustboltOptions } */
module.exports = {
	context: __dirname,
	mode: "development",
	resolve: {
		extensions: ["...", ".ts", ".tsx", ".jsx"]
	},
	module: {
		rules: [
			{
				test: /\.jsx$/,
				use: [
					{
						loader: "builtin:swc-loader",
						options: {
							jsc: {
								parser: {
									syntax: "typescript",
									tsx: true
								},
								transform: {
									react: {
										runtime: "automatic",
										development: true,
										refresh: true
									}
								},
								externalHelpers: true
							}
						}
					},
					{
						loader: "babel-loader",
						options: {
							presets: [["@babel/preset-react", { runtime: "automatic" }]],
							plugins: [require.resolve("react-refresh/babel")]
						}
					}
				]
			}
		]
	},
	plugins: [
		new rustbolt.HtmlRustboltPlugin({ template: "./src/index.html" }),
		new ReactRefreshPlugin()
	],
	entry: "./src/index.jsx",
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
