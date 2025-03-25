/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	context: __dirname,
	module: {
		rules: [
			{
				test: /\.png$/,
				use: [{ loader: "file-loader", options: { esModule: false } }],
				type: "javascript/auto"
			}
		]
	}
};
