/** @type {import("@rustbolt/core").LoaderDefinition} */
module.exports = function (source) {
	return source + 'module.exports += " loader2";\n';
};
