/** @type {import("@rustbolt/core").PitchLoaderDefinitionFunction} */
module.exports.pitch = function (remainingRequest) {
	return (
		"module.exports = require(" + JSON.stringify("!!" + remainingRequest) + ");"
	);
};
