/** @type {import("@rustbolt/core").LoaderDefinition} */
module.exports = function () {
	var err = new Error("emit message");
	err.stack = "emit stack";
	this.emitError(err);
	return '';
};
