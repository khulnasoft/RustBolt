/** @type {import("@rustbolt/core").LoaderDefinition} */
module.exports = function (src) {
	return `module.exports = "loader-b" + module.id`;
};
