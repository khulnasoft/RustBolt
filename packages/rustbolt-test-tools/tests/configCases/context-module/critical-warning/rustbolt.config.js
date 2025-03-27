/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	module: {
		parser: {
			javascript: {
				exprContextCritical: true,
				wrappedContextCritical: true
			}
		}
	}
};
