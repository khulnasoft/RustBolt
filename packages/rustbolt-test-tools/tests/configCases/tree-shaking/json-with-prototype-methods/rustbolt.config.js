/**@type {import("@rustbolt/core").Configuration}*/
module.exports = {
	context: __dirname,
	optimization: {
		innerGraph: true,
		sideEffects: true,
		usedExports: true,
		providedExports: true
	}
};
