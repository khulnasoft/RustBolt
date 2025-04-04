const path = require("path");
const resolve = filename => path.resolve(__dirname, filename);

/**
 * @type {import('@rustbolt/core').RustboltOptions}
 */
module.exports = {
	context: __dirname,
	module: {
		rules: [
			{
				test: resolve("app.jsx"),
				type: "javascript/auto"
			},
			{
				test: resolve("app.tsx"),
				type: "ts"
			}
		]
	}
};
