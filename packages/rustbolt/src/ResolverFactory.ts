import * as binding from "@rustbolt/binding";
import { Resolver } from "./Resolver";
import { type Resolve, getRawResolve } from "./config";

type ResolveOptionsWithDependencyType = Resolve & {
	dependencyCategory?: string;
	resolveToContext?: boolean;
};

export class ResolverFactory {
	#binding: binding.JsResolverFactory;

	static __to_binding(
		resolver_factory: ResolverFactory
	): binding.JsResolverFactory {
		return resolver_factory.#binding;
	}

	constructor(pnp: boolean) {
		this.#binding = new binding.JsResolverFactory(pnp);
	}

	get(
		type: string,
		resolveOptions?: ResolveOptionsWithDependencyType
	): Resolver {
		const { dependencyCategory, resolveToContext, ...resolve } =
			resolveOptions || {};

		const binding = this.#binding.get(type, {
			...getRawResolve(resolve),
			dependencyCategory,
			resolveToContext
		});
		return new Resolver(binding);
	}
}
