/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	mode: "development",
	module: {
		parser: {
			json: {
				exportsDepth: Number.MAX_SAFE_INTEGER
			}
		}
	}
};
