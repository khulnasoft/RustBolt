/** @type {import("@rustbolt/core").LoaderDefinition} */
module.exports = function (source) {
	return "module.exports = " + JSON.stringify("loader matched");
};
