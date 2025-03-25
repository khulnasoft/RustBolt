/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	module: {
		parser: {
			javascript: {
				wrappedContextRegExp: /.*1/
			}
		}
	}
};
