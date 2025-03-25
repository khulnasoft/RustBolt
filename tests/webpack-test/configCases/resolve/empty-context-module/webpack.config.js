/** @type {import("@rustbolt/core").Configuration[]} */
module.exports = [
	{
		cache: true,
		resolve: {
			alias: {
				foo: false
			},
			unsafeCache: true
		}
	},
	{
		resolve: {
			alias: {
				foo: false
			},
			unsafeCache: true
		}
	}
];
