/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	output: {
		environment: {
			arrowFunction: true,
			bigIntLiteral: false,
			const: false,
			destructuring: false,
			forOf: false,
			dynamicImport: true,
			module: false
		}
	}
};
