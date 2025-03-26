/** @type {import("@rustbolt/core").Configuration} */
module.exports = {
	output: {
		library: {
			type: "modern-module"
		}
	},
	optimization: {
		avoidEntryIife: true
	}
};
