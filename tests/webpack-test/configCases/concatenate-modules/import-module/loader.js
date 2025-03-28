/** @type {import("@rustbolt/core").LoaderDefinitionFunction} */
module.exports = function () {
	const callback = this.async();
	this.importModule("./module1", { baseUri: "webpack://" }, (err, exports) => {
		if (err) return callback(err);
		callback(null, `module.exports = ${JSON.stringify(exports.url)}`);
	});
};
