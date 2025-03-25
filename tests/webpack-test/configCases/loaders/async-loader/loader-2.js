/** @type {import("@rustbolt/core").LoaderDefinition} */
module.exports = function () {
	return Promise.resolve(`module.exports = 'b';`);
};
