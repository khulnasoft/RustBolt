/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	builtins: {
		treeShaking: true,
		define: {
			"process.env.NODE_ENV": "development"
		}
	}
};
