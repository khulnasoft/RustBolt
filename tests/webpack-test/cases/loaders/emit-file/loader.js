/** @type {import("@rustbolt/core").LoaderDefinition} */
module.exports = function (content) {
	this.emitFile("extra-file.js", content);
	return "";
};
