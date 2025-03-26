const { rustbolt } = require("@rustbolt/core");
const ReactRefreshPlugin = require("@rustbolt/plugin-react-refresh");
/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	entry: "./index.jsx",
	mode: "development",
	resolve: {
		extensions: ["...", ".ts", ".tsx", ".jsx"]
	},
	devtool: "source-map",
	module: {
		rules: [
			{
				test: /\.jsx$/,
				loader: "builtin:swc-loader",
				options: {
					jsc: {
						parser: {
							syntax: "ecmascript",
							jsx: true,
							sourceMap: true
						},
						transform: {
							react: {
								runtime: "classic",
								pragma: "React.createElement",
								pragmaFrag: "React.Fragment",
								throwIfNamespace: true,
								useBuiltins: false
							}
						}
					}
				}
			}
		]
	},
	plugins: [
		new rustbolt.HotModuleReplacementPlugin(),
		new ReactRefreshPlugin(),
		new rustbolt.DefinePlugin({
			STUB: JSON.stringify("<div></div>")
		})
	]
};
