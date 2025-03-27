const { rustbolt } = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	plugins: [
		new rustbolt.DefinePlugin({
			"process.env.a": "process.env.a",
			a: "b",
			b: "a",
			"typeof process.env.b": "typeof process.env.b",
			"typeof a": "typeof b",
			"typeof b": "typeof a"
		})
	]
};
