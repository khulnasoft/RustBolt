/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	output: {
		filename: "[name].js"
	},
	target: "web",
	module: {
		rules: [
			{
				test: /\.[cm]?js$/,
				parser: {
					worker: ["MyWorker()", "..."]
				}
			}
		]
	}
};
