/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	context: __dirname,
	module: {
		rules: [
			{
				test: /lib\.js$/,
				loader: "./loader.js"
			}
		]
	}
};
