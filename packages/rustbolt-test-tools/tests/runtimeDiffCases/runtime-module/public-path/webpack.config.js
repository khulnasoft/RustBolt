/** @type {import("webpack").Configuration} */
module.exports = {
	output: {
		publicPath: "/public/",
		cssFilename: "css/[name].css"
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ["css-loader"]
			}
		]
	}
};
