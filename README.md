<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://assets.rustbolt.dev/rustbolt/rustbolt-banner-plain-dark.png">
  <img alt="Rustbolt Banner" src="https://assets.rustbolt.dev/rustbolt/rustbolt-banner-plain-light.png">
</picture>

# Rustbolt

<p>
  <a href="https://discord.gg/79ZZ66GH9E"><img src="https://img.shields.io/badge/chat-discord-blue?style=flat-square&logo=discord&colorA=564341&colorB=EDED91" alt="discord channel" /></a>
  <a href="https://www.npmjs.com/package/@rustbolt/core?activeTab=readme"><img src="https://img.shields.io/npm/v/@rustbolt/core?style=flat-square&colorA=564341&colorB=EDED91" alt="npm version" /></a>
  <a href="https://npmcharts.com/compare/@rustbolt/core?minimal=true"><img src="https://img.shields.io/npm/dm/@rustbolt/core.svg?style=flat-square&colorA=564341&colorB=EDED91" alt="downloads" /></a>
  <a href="https://nodejs.org/en/about/previous-releases"><img src="https://img.shields.io/node/v/@rustbolt/core.svg?style=flat-square&colorA=564341&colorB=EDED91" alt="node version"></a>
  <a href="https://github.com/khulnasoft/rustbolt/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square&colorA=564341&colorB=EDED91" alt="license" /></a>
  <a href="https://codspeed.io/khulnasoft/rustbolt"><img src="https://img.shields.io/endpoint?url=https%3A%2F%2Fcodspeed.io%2Fbadge.json&style=flat-square&colorA=564341&colorB=EDED91" alt="codspeed" /></a>
</p>

English | [简体中文](./README.zh-CN.md)

Rustbolt is a high performance JavaScript bundler written in Rust. It offers strong compatibility with the webpack ecosystem, allowing for seamless replacement of webpack, and provides lightning fast build speeds.

## ✨ Features

- 🚀 **Fast Startup**: Based on Rust, the build speed is extremely fast, bringing you the ultimate development experience.
- ⚡ **Lightning HMR**: With a built-in incremental compilation mechanism, HMR is extremely fast and fully capable of developing large-scale projects.
- 📦 **Webpack Compatible**: Compatible with plugins and loaders in the webpack ecosystem, seamlessly integrating excellent libraries built by the community.
- 🎨 **Module Federation**: Provide first-class support for Module Federation to facilitate the development of large-scale web applications.
- 🛠️ **Production Optimization**: Various optimization strategies are built in by default, such as tree shaking, minification, etc.
- 🎯 **Framework Agnostic**: Not bound to any frontend framework, ensuring enough flexibility.

Read [Introduction](https://rustbolt.dev/guide/start/introduction) for details.

## Getting started

See [Quick start](https://rustbolt.dev/guide/start/quick-start).

## Contribution

Please read the [contributing guide](./CONTRIBUTING.md) and let's build Rustbolt together.

### Code of conduct

This repo has adopted the ByteDance Open Source Code of Conduct. Please check [Code of conduct](./CODE_OF_CONDUCT.md) for more details.

## Community

Come chat with us on [Discord](https://discord.gg/79ZZ66GH9E)! Rustbolt team and Rustbolt users are active there, and we're always looking for contributions.

## Links

| Name                                                                                 | Description                                                                     |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| [awesome-rustbolt](https://github.com/khulnasoft/awesome-rustbolt)                    | A curated list of awesome things related to Rustbolt                              |
| [Rustbolt 1.x documentation](https://rustbolt.dev/)                                      | Documentation for Rustbolt 1.x (latest)                                           |
| [Rustbolt 0.x documentation](https://v0.rustbolt.dev/)                                   | Documentation for Rustbolt 0.x version                                            |
| [Rsbuild](https://github.com/khulnasoft/rsbuild)                                  | An out-of-the-box build tool based on Rustbolt                                    |
| [Rspress](https://github.com/khulnasoft/rspress)                                  | A fast static site generator based on Rsbuild                                   |
| [Rsdoctor](https://github.com/khulnasoft/rsdoctor)                                | A one-stop build analyzer for Rustbolt                                            |
| [Rslib](https://github.com/khulnasoft/rslib)                                      | A library development tool powered by Rsbuild                                   |
| [rustbolt-dev-server](https://github.com/khulnasoft/rustbolt-dev-server)              | Dev server for Rustbolt                                                           |
| [rstack-examples](https://github.com/rustbolt-contrib/rstack-examples)                 | Examples showcasing Rstack ecosystem tools (Rustbolt, Rsbuild, Rspress, Rsdoctor) |
| [rustbolt-sources](https://github.com/khulnasoft/rustbolt-sources)                    | Rust port of [webpack-sources](https://www.npmjs.com/package/webpack-sources)   |
| [rstack-design-resources](https://github.com/rustbolt-contrib/rstack-design-resources) | Design resources for Rustbolt Stack                                               |

## Contributors

<a href="https://github.com/khulnasoft/rustbolt/graphs/contributors"><img src="https://opencollective.com/rustbolt/contributors.svg?width=890&button=false" /></a>

## Benchmark

See [Benchmark](https://khulnasoft.github.io/rustbolt-ecosystem-benchmark/).

## Credits

Thanks to:

- [The webpack team and community](https://webpack.js.org/) for creating a great bundler and ecosystem from which we draw a lot of inspiration.
- [@sokra](https://github.com/sokra) for the great work on the [webpack](https://github.com/webpack/webpack) project.
- [@ScriptedAlchemy](https://github.com/ScriptedAlchemy) for creating Module Federation and helping Rustbolt connect with the community.
- The [SWC](https://github.com/swc-project/swc) project created by [@kdy1](https://github.com/kdy1), which powers Rustbolt's code parsing, transformation and minification.
- The [esbuild](https://github.com/evanw/esbuild) project created by [@evanw](https://github.com/evanw), which inspired the concurrent architecture of Rustbolt.
- The [NAPI-RS](https://github.com/napi-rs/napi-rs) project created by [@Brooooooklyn](https://github.com/Brooooooklyn), which powers Rustbolt's node-binding implementation.
- The [Parcel](https://github.com/parcel-bundler/parcel) project created by [@devongovett](https://github.com/devongovett) which is the pioneer of rust bundler and inspired Rustbolt's incremental rebuild design.
- The [Vite](https://github.com/vitejs/vite) project created by [Evan You](https://github.com/yyx990803) which inspired Rustbolt's compatibility design of webpack's ecosystem.
- The `rolldown-legacy` project created by old Rolldown team, It's the predecessor of the [rolldown](https://github.com/rolldown) project, which explores the possibility of making a performant bundler in Rust with Rollup-compatible API. It inspires the design principles of Rustbolt.
- The [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) project created by [@jantimon](https://github.com/jantimon), `@rustbolt/html-plugin` is a fork of [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) to avoid some webpack API usage not supported in Rustbolt.
- The [Turbopack](https://github.com/vercel/turbo) project which inspired the AST path logic of Rustbolt.
- The [react-refresh-webpack-plugin](https://github.com/pmmmwh/react-refresh-webpack-plugin) created by [@pmmmwh](https://github.com/pmmmwh), which inspires implement [react refresh rustbolt plugin](https://github.com/rustbolt-contrib/rustbolt-plugin-react-refresh).
- The [prefresh](https://github.com/preactjs/prefresh) created by [@Jovi De Croock](https://github.com/JoviDeCroock), which inspires implement [preact refresh rustbolt plugin](https://github.com/rustbolt-contrib/rustbolt-plugin-preact-refresh).
- The [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin) project created by [@sokra](https://github.com/sokra) which inspired implement css extract plugin.
- The [copy-webpack-plugin](https://github.com/webpack-contrib/copy-webpack-plugin) project created by [@kevlened](https://github.com/kevlened) which inspired implement copy rustbolt plugin.
- The [webpack-subresource-integrity](https://github.com/waysact/webpack-subresource-integrity) project created by [@jscheid](https://github.com/jscheid), which inspires implement subresource integrity rustbolt plugin.
- The [circular-dependency-plugin](https://github.com/aackerman/circular-dependency-plugin) project created by [@aackerman](https://github.com/aackerman), which inspres implement circular dependency rustbolt plugin.

## License

Rustbolt is [MIT licensed](https://github.com/khulnasoft/rustbolt/blob/main/LICENSE).
