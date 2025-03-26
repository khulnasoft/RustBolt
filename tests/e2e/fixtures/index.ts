import { test as base, expect } from "@playwright/test";
import { pathInfoFixtures } from "./pathInfo";
import { rustboltFixtures, type RustboltOptions } from "./rustbolt";
import { fileActionFixtures } from "./fileAction";

const test = base
	.extend(pathInfoFixtures)
	.extend(rustboltFixtures(true))
	.extend(rustboltFixtures(false))
	.extend(fileActionFixtures);

export type { RustboltOptions };
export { test, expect };
