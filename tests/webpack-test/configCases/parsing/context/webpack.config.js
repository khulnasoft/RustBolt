/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	module: {
		unknownContextRegExp: /^\.\//,
		unknownContextCritical: false,
		exprContextRegExp: /^\.\//,
		exprContextCritical: false
	}
};
