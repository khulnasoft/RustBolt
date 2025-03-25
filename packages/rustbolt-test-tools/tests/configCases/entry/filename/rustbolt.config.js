/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	entry: {
		main: {
			import: "./index.js",
			filename: "my-[name].js"
		}
	}
};
