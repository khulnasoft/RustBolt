/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	output: {
		filename: "[name].js"
	},
	optimization: {
		chunkIds: "named"
	},
	entry: {
		a: "./a",
		b: "./b",
		c: "./c"
	}
};
