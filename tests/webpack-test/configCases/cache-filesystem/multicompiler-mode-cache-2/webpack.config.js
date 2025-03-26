"use strict";

// no cache names

/** @type {import("@rustbolt/core").Configuration} */
module.exports = [
	{
		mode: "production",
		entry: "./index",
		cache: {
			type: "filesystem"
		}
	},
	{
		mode: "production",
		entry: "./index",
		cache: {
			type: "filesystem"
		}
	},
	{
		name: "3rd compiler",
		mode: "production",
		entry: "./index",
		cache: {
			type: "filesystem"
		}
	}
];
