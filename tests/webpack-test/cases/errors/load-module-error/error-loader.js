/** @type {import("@rustbolt/core").LoaderDefinition} */
module.exports = function (source) {
	const callback = this.async();
	callback(new Error("err: abc"));
}
