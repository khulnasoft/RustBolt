/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	module: {
		rules: [
			{
				resourceQuery: /^\?loader/,
				use: "./loader?query"
			}
		]
	}
};
