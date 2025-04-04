/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	module: {
		rules: [
			{
				test: /\.tsx$/,
				use: [
					{
						loader: "builtin:swc-loader",
						options: {
							jsc: {
								target: "es2015",
								parser: {
									syntax: "typescript",
									tsx: true,
									dynamicImport: true,
									classProperty: true,
									exportNamespaceFrom: true,
									exportDefaultFrom: true
								}
							}
						}
					}
				],
				type: "javascript/auto"
			}
		]
	},
	devtool: "inline-source-map"
};
