/**
 * @type {import('@rustbolt/core').RustboltOptions}
 */
module.exports = {
	context: __dirname,
	module: {
		rules: [
			{
				test: /\.svg$/,
				resourceQuery: /inline/,
				type: "asset/inline"
			}
		]
	}
};
