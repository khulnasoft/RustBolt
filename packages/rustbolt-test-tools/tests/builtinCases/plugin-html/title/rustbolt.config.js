/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	entry: {
		index: {
			import: ["./index.js"]
		}
	},
	builtins: {
		html: [
			{
				title: "Rustbolt title"
			}
		]
	}
};
