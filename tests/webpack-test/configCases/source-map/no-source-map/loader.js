const path = require("path");
/** @type {import("@rustbolt/core").LoaderDefinition} */
module.exports = function () {
	this.callback(null, "module.exports = 'ok';", {
		version: 3,
		file: "/should/be/removed",
		sourceRoot: path.join(__dirname, "folder"),
		sources: ["test1.txt"],
		sourcesContent: ["Test"],
		names: [],
		mappings: "AAAA"
	});
};
