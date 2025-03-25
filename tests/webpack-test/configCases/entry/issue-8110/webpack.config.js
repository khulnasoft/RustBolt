/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	entry: {
		bundle0: "./a",
		other: "./b"
	},
	output: {
		filename: "[name].js"
	}
};
