/** @type {import("@rustbolt/core").Configuration[]} */
module.exports = [
	{
		mode: "production",
		entry: "./index",
		output: {
			filename: "a.js"
		},
		stats: "none"
	},

	{
		mode: "production",
		entry: "./index",
		output: {
			filename: "b.js"
		},
		stats: "none"
	}
];
