/** @type {import("@rustbolt/core").PitchLoaderDefinitionFunction} */
exports.pitch = async function (remaining) {
	const result = await this.importModule(
		this.resourcePath + ".webpack[javascript/auto]" + "!=!" + remaining,
		this.getOptions()
	);
	return result.default || result;
};
