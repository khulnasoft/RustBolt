import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "@rustbolt/cli";
import { rustbolt } from "@rustbolt/core";
import { VueLoaderPlugin } from "vue-loader";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ["chrome >= 87", "edge >= 88", "firefox >= 78", "safari >= 14"];

export default defineConfig({
	context: __dirname,
	entry: {
		main: "./src/main.js"
	},
	resolve: {
		extensions: ["...", ".ts", ".vue"]
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: "vue-loader",
				options: {
					experimentalInlineMatchResource: true
				}
			},
			{
				test: /\.(js|ts)$/,
				use: [
					{
						loader: "builtin:swc-loader",
						options: {
							jsc: {
								parser: {
									syntax: "typescript"
								}
							},
							env: { targets }
						}
					}
				]
			},
			{
				test: /\.svg/,
				type: "asset/resource"
			}
		]
	},
	plugins: [
		new rustbolt.HtmlRustboltPlugin({
			template: "./index.html"
		}),
		new rustbolt.DefinePlugin({
			__VUE_OPTIONS_API__: true,
			__VUE_PROD_DEVTOOLS__: false
		}),
		new VueLoaderPlugin()
	],
	optimization: {
		minimizer: [
			new rustbolt.SwcJsMinimizerRustboltPlugin(),
			new rustbolt.LightningCssMinimizerRustboltPlugin({
				minimizerOptions: { targets }
			})
		]
	},
	experiments: {
		css: true
	}
});
