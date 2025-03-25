/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	target: "web",
	node: false,
	devtool: "source-map",
	externals: ["source-map"],
	externalsType: "commonjs"
};
