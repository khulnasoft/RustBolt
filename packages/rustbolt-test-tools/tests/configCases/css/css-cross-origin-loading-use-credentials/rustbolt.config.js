/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	output: {
		crossOriginLoading: "use-credentials"
	},
	entry: "./index.js",
	target: "web",
	module: {
		rules: [
			{
				test: /\.css$/,
				type: "css/module"
			}
		]
	},
	experiments: {
		css: true
	}
};
