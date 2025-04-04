/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	externals: [
		"path",
		"foo",
		/^raz$/,
		{
			bar: "'bar'",
			baz: "var 'baz'",
			myos: "commonjs os",
			external: ["Array", "isArray"],
			external2: ["commonjs process", "version"],
			external3: ["var globalThis"],
			external4: ["global process", "version"],
			external5: ["this obj", "name"]
		},
		function ({ request }) {
			if (request === "fn") {
				return "'fn'";
			}
		},
		function ({ request }) {
			if (request === "asyncFn") {
				return "'asyncFn'";
			}
		}
	],
	externalsPresets: {
		node: false
	}
};
