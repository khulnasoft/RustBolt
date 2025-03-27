/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	entry() {
		return {
			a: { import: "./a" },
			b: { import: ["./b"] }
		};
	},
	output: {
		filename: "[name].js"
	}
};
