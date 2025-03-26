/** @type {import("@rustbolt/core").LoaderDefinition} */
export default function loader() {
	return `export default "${this.loaders[this.loaderIndex].type}";`;
}
