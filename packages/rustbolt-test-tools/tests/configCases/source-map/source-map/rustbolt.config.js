const { rustbolt } = require("@rustbolt/core");
/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	devtool: "source-map",
	externals: ["source-map"],
	externalsType: "commonjs",
	resolve: {
		extensions: ["...", ".ts", ".tsx", ".jsx"]
	},
	module: {
		rules: [
			{
				test: /\.jsx$/,
				loader: "builtin:swc-loader",
				options: {
					jsc: {
						parser: {
							syntax: "ecmascript",
							jsx: true
						}
					}
				}
			}
		]
	},
	plugins: [
		new rustbolt.DefinePlugin({
			CONTEXT: JSON.stringify(__dirname)
		})
	]
};
