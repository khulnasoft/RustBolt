import { BuiltinPluginName } from "@rustbolt/binding";

import { create } from "./base";

export const FileUriPlugin = create(
	BuiltinPluginName.FileUriPlugin,
	() => {},
	"compilation"
);
