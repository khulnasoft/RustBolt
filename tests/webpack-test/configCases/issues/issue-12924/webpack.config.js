"use strict";

/** @type {import("@rustbolt/core").Configuration[]} */
module.exports = [
	{
		output: {
			globalObject: "null || new Function('return this')()"
		}
	},
	{
		output: {
			globalObject: "(new Function('return this'))()"
		}
	},
	{
		output: {
			globalObject: "1 > 2 ? null : new Function('return this')()"
		}
	}
];
