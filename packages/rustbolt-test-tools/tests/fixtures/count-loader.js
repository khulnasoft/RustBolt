let counter = 0;

/** @type {import("@rustbolt/core").LoaderDefinition} */
module.exports = function () {
	return `module.exports = ${counter++};`;
};
