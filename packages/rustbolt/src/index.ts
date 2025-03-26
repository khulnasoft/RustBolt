import * as rustboltExports from "./exports";
import { rustbolt as rustboltFn } from "./rustbolt";
// add exports on rustbolt() function
type Rustbolt = typeof rustboltFn &
	typeof rustboltExports & { rustbolt: Rustbolt; webpack: Rustbolt };
const fn = Object.assign(rustboltFn, rustboltExports) as Rustbolt;
fn.rustbolt = fn;
fn.webpack = fn;
const rustbolt: Rustbolt = fn;

export * from "./exports";
export default rustbolt;
export { rustbolt };
module.exports = rustbolt;
