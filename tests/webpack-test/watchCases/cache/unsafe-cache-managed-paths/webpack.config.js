/** @type {function(): import("@rustbolt/core").Configuration} */
module.exports = (env, { srcPath }) => ({
	mode: "development",
	cache: {
		type: "memory"
	},
	snapshot: {
		managedPaths: [/^(.+?[\\/]node_modules[\\/])/]
	}
});
