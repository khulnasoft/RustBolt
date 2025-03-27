const path = require("node:path");
const { rustbolt } = require("@rustbolt/core");
const ReactRefreshPlugin = require("@rustbolt/plugin-react-refresh");

module.exports = {
	context: __dirname,
	mode: "development",
	entry: {
		main: "./src/main.jsx"
	},
	plugins: [
		new rustbolt.HtmlRustboltPlugin({ template: "./src/index.html" }),
		new ReactRefreshPlugin(),
		new rustbolt.CssExtractRustboltPlugin()
	],
	resolve: {
		extensions: ["...", ".ts", ".tsx", ".jsx"]
	},
	experiments: {
		css: false
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
			},
			{
				test: /\.css$/,
				use: [
					rustbolt.CssExtractRustboltPlugin.loader,
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: {
									tailwindcss: {
										config: path.join(__dirname, "./tailwind.config.js")
									}
								}
							}
						}
					}
				]
			}
		]
	}
};
