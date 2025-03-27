/** @type {import("@rustbolt/core").LoaderDefinition<{ get(): string }>} */
module.exports = function (source) {
	return "module.exports='__css__'";
};
