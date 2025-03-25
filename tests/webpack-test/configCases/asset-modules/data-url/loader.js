/** @type {import("@rustbolt/core").LoaderDefinition<{ f(): any }>} */
module.exports = function (source) {
	return `${source}, World!`;
};
