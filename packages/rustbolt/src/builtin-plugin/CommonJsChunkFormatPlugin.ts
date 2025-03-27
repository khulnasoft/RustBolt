import { BuiltinPluginName } from "@rustbolt/binding";

import { create } from "./base";

export const CommonJsChunkFormatPlugin = create(
	BuiltinPluginName.CommonJsChunkFormatPlugin,
	() => {}
);
