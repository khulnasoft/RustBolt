/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	devtool: "source-map",
	output: {
		library: ["Foo", "[name]"]
	}
};
