import { BuiltinPluginName } from "@rustbolt/binding";
import { create } from "./base";

export const ModuleInfoHeaderPlugin = create(
	BuiltinPluginName.ModuleInfoHeaderPlugin,
	verbose => verbose,
	"compilation"
);
