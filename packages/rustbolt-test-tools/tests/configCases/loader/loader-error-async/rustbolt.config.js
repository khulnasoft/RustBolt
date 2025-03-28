const path = require("path");
const file = path.resolve(__dirname, "lib.js");

/**
 * @type {import('@rustbolt/core').RustboltOptions}
 */
module.exports = {
	context: __dirname,
	module: {
		rules: [
			{
				test: file,
				resourceQuery: /async/,
				use: [
					{
						loader: "./async.js"
					}
				]
			},
			{
				test: file,
				resourceQuery: /callback/,
				use: [
					{
						loader: "./callback.js"
					}
				]
			}
		]
	}
};
