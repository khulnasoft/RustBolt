/**
 * @type {import('@rustbolt/core').RustboltOptions}
 */
module.exports = {
	context: __dirname,
	devtool: false,
	optimization: {
		concatenateModules: true,
		minimize: false
	}
};
