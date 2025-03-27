/** @type {import("@rustbolt/core").LoaderDefinition} */
module.exports = function (source) {
	return `module.exports = "${this.mode}";`;
};
