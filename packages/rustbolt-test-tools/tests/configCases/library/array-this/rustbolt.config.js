/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	target: "web",
	output: {
		library: ["a", "b"],
		libraryTarget: "this",
		environment: {
			arrowFunction: false
		}
	}
};
