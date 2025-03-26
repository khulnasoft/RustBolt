/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	entry() {
		return {
			a: "./a",
			b: ["./b"]
		};
	},
	output: {
		filename: "[name].js"
	}
};
