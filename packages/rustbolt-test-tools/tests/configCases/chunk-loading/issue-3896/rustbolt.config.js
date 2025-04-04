const assert = require("assert");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	target: "node",
	plugins: [
		{
			apply(compiler) {
				compiler.hooks.thisCompilation.tap(
					"ensure-chunk.groupsIterable-and-group.getParents-work",
					compilation => {
						compilation.hooks.processAssets.tap(
							"ensure-chunk.groupsIterable-and-group.getParents-work",
							() => {
								let chunks = [...compilation.chunks];
								assert(chunks.length > 0);
								for (const chunk of chunks) {
									assert(typeof chunk.groupsIterable !== "undefined");
									for (const group of chunk.groupsIterable) {
										assert(typeof group.index === "number");
										assert(Array.isArray(group.getParents()));
										if (group.index === 1) {
											assert(group.name === "main");
										} else {
											assert(typeof group.name === "undefined");
										}
									}
								}
							}
						);
					}
				);
			}
		}
	]
};
