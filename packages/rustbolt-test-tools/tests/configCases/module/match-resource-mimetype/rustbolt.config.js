const path = require("path");

/**
 * @type {import('@rustbolt/core').RustboltOptions}
 */
module.exports = {
	module: {
		rules: [
			{
				include: path.resolve(__dirname, "a.js"),
				use: [
					"./get-source.js",
					{
						loader: "builtin:swc-loader",
						options: {
							jsc: {
								target: "es3"
							}
						}
					}
				]
			}
		]
	}
};
