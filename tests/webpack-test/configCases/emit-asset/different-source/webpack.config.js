/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	module: {
		rules: [
			{
				test: /\.txt$/,
				use: {
					loader: "file-loader",
					options: {
						name: "same-name.txt"
					}
				}
			}
		]
	}
};
