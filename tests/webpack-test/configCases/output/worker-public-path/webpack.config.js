/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	mode: "none",
	target: "node",
	node: {
		__dirname: false,
		__filename: false
	},
	output: {
		filename: "[name].js",
		workerPublicPath: "/workerPublicPath2/"
	}
};
