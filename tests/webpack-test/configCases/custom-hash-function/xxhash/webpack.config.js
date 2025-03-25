/** @type {import("@rustbolt/core").Configuration[]} */
module.exports = [
	{
		output: {
			hashFunction: require("xxhashjs").h32
		}
	}
];
