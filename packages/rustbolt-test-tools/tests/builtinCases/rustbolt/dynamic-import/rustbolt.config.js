/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	target: ["node"],
	entry: {
		main: {
			import: ["./index.js"]
		}
	}
};
