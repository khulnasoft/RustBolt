"use strict";

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	experiments: {
		lazyCompilation: {
			entries: false,
			cacheable: false,
			test: /moduleA/
		}
	}
};
