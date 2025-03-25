/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	module: {
		rules: [
			{
				test: /\.my$/,
				loader: "regexp-#-loader"
			}
		]
	}
};
