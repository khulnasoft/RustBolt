const path = require("path");

/**
 * @type {import('@rustbolt/core').RustboltOptions}
 */
module.exports = {
	target: "web",
	context: __dirname,
	module: {
		rules: [
			{
				test: path.join(__dirname, "a.js"),
				use: [
					{
						loader: "./my-loader.js"
					}
				]
			}
		]
	}
};
