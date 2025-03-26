<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://assets.rustbolt.dev/rustbolt/rustbolt-banner-plain-dark.png">
  <img alt="Rustbolt Banner" src="https://assets.rustbolt.dev/rustbolt/rustbolt-banner-plain-light.png">
</picture>

# @rustbolt/dev-server

<p>
  <a href="https://npmjs.com/package/@rustbolt/dev-server?activeTab=readme"><img src="https://img.shields.io/npm/v/@rustbolt/dev-server?style=flat-square&colorA=564341&colorB=EDED91" alt="npm version" /></a>
  <a href="https://npmcharts.com/compare/@rustbolt/dev-server?minimal=true"><img src="https://img.shields.io/npm/dm/@rustbolt/dev-server.svg?style=flat-square&colorA=564341&colorB=EDED91" alt="downloads" /></a>
  <a href="https://nodejs.org/en/about/previous-releases"><img src="https://img.shields.io/node/v/@rustbolt/dev-server.svg?style=flat-square&colorA=564341&colorB=EDED91" alt="node version"></a>
  <a href="https://github.com/web-infra-dev/rustbolt-dev-server/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square&colorA=564341&colorB=EDED91" alt="license" /></a>
</p>

Use Rustbolt with a development server that provides live reloading. This should be used for development only.

> `@rustbolt/dev-server` is based on `webpack-dev-server@5`

## Installation

First of all, install `@rustbolt/dev-server` and `@rustbolt/core` by your favorite package manager:

```bash
# npm
$ npm install @rustbolt/dev-server @rustbolt/core --save-dev

# yarn
$ yarn add @rustbolt/dev-server @rustbolt/core --dev

# pnpm
$ pnpm add @rustbolt/dev-server @rustbolt/core --save-dev

# bun
$ bun add @rustbolt/dev-server @rustbolt/core -D
```

## Usage

There are two recommended ways to use `@rustbolt/dev-server`:

### With the CLI

The easiest way to use it is with the [`@rustbolt/cli`](https://www.npmjs.com/package/@rustbolt/cli).

You can install it in your project by:

```bash
# npm
$ npm install @rustbolt/cli --save-dev

# yarn
$ yarn add @rustbolt/cli --dev

# pnpm
$ pnpm add @rustbolt/cli --save-dev

# bun
$ bun add @rustbolt/cli -D
```

And then start the development server by:

```bash
# with rustbolt.config.js
$ rustbolt serve

# with custom config file
$ rustbolt serve -c ./your.config.js
```

> See [CLI](https://rustbolt.dev/api/cli) for more details.

While starting the development server, you can specify the configuration by the `devServer` field of your Rustbolt config file:

```js
// rustbolt.config.js
module.exports = {
  // ...
  devServer: {
    // the configuration of the development server
    port: 8080
  },
};
```

> See [DevServer](https://rustbolt.dev/config/dev-server) for all configuration options.

### With the API

While it's recommended to run `@rustbolt/dev-server` via the CLI, you may also choose to start a server via the API.

```js
import { RustboltDevServer } from "@rustbolt/dev-server";
import rustbolt from "@rustbolt/core";
import rustboltConfig from './rustbolt.config.js';

const compiler = rustbolt(rustboltConfig);
const devServerOptions = {
  ...rustboltConfig.devServer,
  // override
  port: 8888
};

const server = new RustboltDevServer(devServerOptions, compiler);

server.startCallback(() => {
  console.log('Successfully started server on http://localhost:8888');
});
```

> Cause `@rustbolt/dev-server` is based on `webpack-dev-server@5`, you can see the [webpack-dev-server API](https://webpack.js.org/api/webpack-dev-server/) for more methods of the server instance.

## Credits

Thanks to the [webpack-dev-server](https://github.com/webpack/webpack-dev-server) project created by [@sokra](https://github.com/sokra)

## License

[MIT licensed](https://github.com/web-infra-dev/rustbolt-dev-server/blob/main/LICENSE).
