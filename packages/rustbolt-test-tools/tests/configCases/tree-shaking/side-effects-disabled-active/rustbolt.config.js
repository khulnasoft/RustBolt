/**@type {import("@rustbolt/core").Configuration}*/
module.exports = {
	module: {
		rules: [
			{
				test: /side-effect\.js/,
				sideEffects: false
			}
		]
	},
	optimization: {
		sideEffects: false
	}
};
