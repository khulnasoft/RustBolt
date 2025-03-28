const Compiler = require("@rustbolt/core").Compiler;

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	optimization: {
		minimize: true,
		minimizer: [
			{
				/**
				 * @param {Compiler} compiler the compiler
				 */
				apply(compiler) {
					expect(compiler).toBeInstanceOf(Compiler);
				}
			},
			/**
			 * @this {Compiler} the compiler
			 * @param {Compiler} compiler the compiler
			 */
			function (compiler) {
				expect(compiler).toBe(this);
				expect(compiler).toBeInstanceOf(Compiler);
			}
		]
	}
};
