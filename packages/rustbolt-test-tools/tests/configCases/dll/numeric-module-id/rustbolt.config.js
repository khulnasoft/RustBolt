const rustbolt = require("@rustbolt/core");
const path = require("path");

const dllManifest = path.resolve(
	__dirname,
	"../../../js/config/dll/numeric-module-id/manifest.json"
);

/** @type {import("@rustbolt/core").Configuration[]} */
module.exports = [
	{
		name: "create-dll",
		entry: "./lib.js",
		output: {
			filename: "lib-dll.js",
			library: {
				type: "commonjs2"
			}
		},
		optimization: {
			moduleIds: "deterministic",
			chunkIds: "deterministic"
		},
		plugins: [
			new rustbolt.DllPlugin({
				path: dllManifest,
				entryOnly: false
			})
		]
	},
	{
		name: "use-dll",
		dependencies: ["create-dll"],
		entry: "./main.js",
		plugins: [
			function (compiler) {
				compiler.hooks.beforeRun.tap("test", () => {
					new rustbolt.DllReferencePlugin({
						manifest: require(dllManifest),
						sourceType: "commonjs2",
						scope: "dll",
						name: "./lib-dll.js"
					}).apply(compiler);
				});
			}
		]
	}
];
