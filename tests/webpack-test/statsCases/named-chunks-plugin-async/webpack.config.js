"use strict";

const {
	ids: { NamedChunkIdsPlugin }
} = require("@rustbolt/core");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	mode: "production",
	optimization: { chunkIds: false },
	entry: {
		entry: "./entry"
	},
	plugins: [new NamedChunkIdsPlugin()]
};
