/** @type {import("@rustbolt/core").LoaderDefinition} */
module.exports = function () {
	const callback = this.async();

	callback(null, `module.exports = 'c';`);
};
