const { rustbolt } = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	plugins: [
		new rustbolt.EntryPlugin(__dirname, "./a.js", {
			filename: "pages/[name].js",
			name: "a"
		})
	]
};
