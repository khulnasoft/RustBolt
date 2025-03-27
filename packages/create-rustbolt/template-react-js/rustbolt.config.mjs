import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "@rustbolt/cli";
import { rustbolt } from "@rustbolt/core";
import RefreshPlugin from "@rustbolt/plugin-react-refresh";

const __dirname = dirname(fileURLToPath(import.meta.url));
const isDev = process.env.NODE_ENV === "development";

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ["chrome >= 87", "edge >= 88", "firefox >= 78", "safari >= 14"];

export default defineConfig({
	context: __dirname,
	entry: {
		main: "./src/main.jsx"
	},
	resolve: {
		extensions: ["...", ".ts", ".tsx", ".jsx"]
	},
	module: {
		rules: [
			{
				test: /\.svg$/,
				type: "asset"
			},
			{
				test: /\.(jsx?|tsx?)$/,
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
										development: isDev,
										refresh: isDev
									}
								}
							},
							env: { targets }
						}
					}
				]
			}
		]
	},
	plugins: [
		new rustbolt.HtmlRustboltPlugin({
			template: "./index.html"
		}),
		isDev ? new RefreshPlugin() : null
	].filter(Boolean),
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
