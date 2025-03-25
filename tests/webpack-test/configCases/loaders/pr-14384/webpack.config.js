const PluginWithLoader = require("./PluginWithLoader.js");

/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	plugins: [new PluginWithLoader()]
};
