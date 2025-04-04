<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://assets.rustbolt.dev/rustbolt/rustbolt-banner-plain-dark.png">
  <img alt="Rustbolt Banner" src="https://assets.rustbolt.dev/rustbolt/rustbolt-banner-plain-light.png">
</picture>

# Rustbolt

<p>
  <a href="https://discord.gg/79ZZ66GH9E"><img src="https://img.shields.io/badge/chat-discord-blue?style=flat-square&logo=discord&colorA=564341&colorB=EDED91" alt="discord channel" /></a>
  <a href="https://www.npmjs.com/package/@rustbolt/core?activeTab=versions"><img src="https://img.shields.io/npm/v/@rustbolt/core?style=flat-square&colorA=564341&colorB=EDED91" alt="npm version" /></a>
  <a href="https://npmcharts.com/compare/@rustbolt/core?minimal=true"><img src="https://img.shields.io/npm/dm/@rustbolt/core.svg?style=flat-square&colorA=564341&colorB=EDED91" alt="downloads" /></a>
  <a href="https://nodejs.org/en/about/previous-releases"><img src="https://img.shields.io/node/v/@rustbolt/core.svg?style=flat-square&colorA=564341&colorB=EDED91" alt="node version"></a>
  <a href="https://github.com/khulnasoft/rustbolt/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square&colorA=564341&colorB=EDED91" alt="license" /></a>
  <a href="https://codspeed.io/khulnasoft/rustbolt"><img src="https://img.shields.io/endpoint?url=https%3A%2F%2Fcodspeed.io%2Fbadge.json&style=flat-square&colorA=564341&colorB=EDED91" alt="codspeed" /></a>
</p>

[English](./README.md) | 简体中文

Rustbolt 是一个基于 Rust 编写的高性能 JavaScript 打包工具，它提供对 webpack 生态良好的兼容性，能够无缝替换 webpack，并提供闪电般的构建速度。

## ✨ 特性

- 🚀 **启动速度极快**: 基于 Rust 实现，构建速度极快，带给你极致的开发体验。
- ⚡ **闪电般的 HMR**: 内置增量编译机制，HMR 速度极快，完全胜任大型项目的开发。
- 📦 **兼容 webpack 生态**: 兼容 webpack 生态中的 plugin 和 loader，无缝衔接社区中沉淀的优秀库。
- 🎨 **模块联邦**: 为 Module Federation 提供一流的支持，助力开发规模化的 Web 应用。
- 🛠️ **默认生产优化**: 默认内置多种优化策略，如 Tree Shaking、代码压缩等等。
- 🎯 **框架无关**: 不和任何前端框架绑定，保证足够的灵活性。

请阅读 [Rustbolt 介绍](https://rustbolt.dev/zh/guide/start/introduction) 章节来了解更多。

## 快速上手

请阅读[快速上手](https://rustbolt.dev/zh/guide/start/quick-start)。

## 参与贡献

请阅读[贡献指南](./CONTRIBUTING.md)来共同参与 Rustbolt 的建设。

### 行为准则

本仓库采纳了字节跳动的开源项目行为准则。请点击[行为准则](./CODE_OF_CONDUCT.md)查看更多的信息。

## 链接

| 名称                                                                                 | 描述                                                                         |
| ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| [awesome-rustbolt](https://github.com/khulnasoft/awesome-rustbolt)                    | 与 Rustbolt 相关的精彩内容列表                                                 |
| [Rustbolt 1.x 文档](https://rustbolt.dev/zh/)                                            | Rustbolt 1.x 版本的文档（最新）                                                |
| [Rustbolt 0.x 文档](https://v0.rustbolt.dev/zh/)                                         | Rustbolt 0.x 版本的文档                                                        |
| [Rsbuild](https://github.com/khulnasoft/rsbuild)                                  | 基于 Rustbolt 的构建工具                                                       |
| [Rspress](https://github.com/khulnasoft/rspress)                                  | 基于 Rsbuild 的静态站点生成器                                                |
| [Rsdoctor](https://github.com/khulnasoft/rsdoctor)                                | 针对 Rustbolt 的一站式构建分析工具                                             |
| [Rslib](https://github.com/khulnasoft/rslib)                                      | 基于 Rsbuild 的 library 开发工具                                             |
| [rustbolt-dev-server](https://github.com/khulnasoft/rustbolt-dev-server)              | Rustbolt 的开发服务器                                                          |
| [rstack-examples](https://github.com/rustbolt-contrib/rstack-examples)                 | Rstack 生态（Rustbolt、Rsbuild、Rspress、Rsdoctor）的示例                      |
| [rustbolt-sources](https://github.com/khulnasoft/rustbolt-sources)                    | Rust 版本的 [webpack-sources](https://www.npmjs.com/package/webpack-sources) |
| [rstack-design-resources](https://github.com/rustbolt-contrib/rstack-design-resources) | Rustbolt Stack 的设计资源                                                      |

## 致谢

感谢:

- [webpack 团队和社区](https://webpack.js.org/)创建了一个优秀的打包工具和丰富的生态。
- [@sokra](https://github.com/sokra) 在 [webpack](https://github.com/webpack/webpack) 项目上的出色工作。
- [@ScriptedAlchemy](https://github.com/ScriptedAlchemy) 创造了模块联邦，并帮助 Rustbolt 与社区建立联系。
- [SWC](https://swc.rs/) 项目（由 [@kdy1](https://github.com/kdy1) 创建），为 Rustbolt 的代码解析、转换和压缩提供了支持。
- [esbuild](https://github.com/evanw/esbuild) 项目（由 [@evanw](https://github.com/evanw) 创建），它启发了 Rustbolt 的并发架构。
- [NAPI-RS](https://github.com/napi-rs/napi-rs) 项目（由 [@Brooooooklyn](https://github.com/Brooooooklyn) 创建），为 Rustbolt 的 node-binding 实现提供了支持。
- [Parcel](https://github.com/parcel-bundler/parcel) 项目（由 [@devongovett](https://github.com/devongovett)创建），它是 Rust Bundler 的先行探索者并启发了 Rustbolt 的增量构建架构。
- [Vite](https://github.com/vitejs/vite) 由[尤雨溪](https://github.com/yyx990803)创建，它和 Rollup 社区的兼容性设计启发了 Rustbolt 和 webpack 社区的兼容设计。
- `rolldown-legacy` 项目，它是 [rolldown](https://github.com/rolldown) 项目的前身，它探索了使用 Rust 构建高性能 Bundler + 兼容 Rollup API 的可能性，启发了 Rustbolt 的设计方向。
- [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) 项目（由 [@jantimon](https://github.com/jantimon) 创建），Rustbolt 的 `@rustbolt/html-plugin` 是 [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) 的一个 fork 来避免使用在 Rustbolt 中尚未支持的 webpack API。
- [Turbopack](https://github.com/vercel/turbo) 项目，它启发了 Rustbolt 里基于 AST 的路径重写逻辑。
- [react-refresh-webpack-plugin](https://github.com/pmmmwh/react-refresh-webpack-plugin) 项目（由 [@pmmmwh](https://github.com/pmmmwh) 创建），它启发了 Rustbolt 内的 ReactRefreshPlugin 实现。
- [prefresh](https://github.com/preactjs/prefresh) 项目（由 [@Jovi De Croock](https://github.com/JoviDeCroock) 创建），它启发了 Rustbolt 内的 PreactRefreshPlugin 实现。
- [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin) 项目（由 [@sokra](https://github.com/sokra) 创建），它启发了 Rustbolt 内的 CssExtractPlugin 实现。
- [copy-webpack-plugin](https://github.com/webpack-contrib/copy-webpack-plugin) 项目（由 [@kevlened](https://github.com/kevlened) 创建），它启发了 Rustbolt 内的 CopyPlugin 实现。
- [webpack-subresource-integrity](https://github.com/waysact/webpack-subresource-integrity) 项目（由 [@jscheid](https://github.com/jscheid) 创建），它启发了 Rustbolt 内的 SubresourceIntegrityPlugin 实现。

## License

Rustbolt 项目基于 [MIT 协议](https://github.com/khulnasoft/rustbolt/blob/main/LICENSE)，请自由地享受和参与开源。

## Community

- 可以在 [Discord](https://discord.gg/79ZZ66GH9E) 上和 Rustbolt Team 以及 Rustbolt 用户交流

- 也可以在 [飞书](https://applink.feishu.cn/client/chat/chatter/add_by_link?link_token=3c3vca77-bfc0-4ef5-b62b-9c5c9c92f1b4) 上和我们交流
