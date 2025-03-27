<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://assets.rustbolt.dev/rustbolt/rustbolt-banner-plain-dark.png">
  <img alt="Rustbolt Banner" src="https://assets.rustbolt.dev/rustbolt/rustbolt-banner-plain-light.png">
</picture>

# @rustbolt/plugin-react-refresh

<p>
  <a href="https://www.npmjs.com/package/@rustbolt/plugin-react-refresh?activeTab=readme"><img src="https://img.shields.io/npm/v/@rustbolt/plugin-react-refresh?style=flat-square&colorA=564341&colorB=EDED91" alt="npm version" /></a>
  <a href="https://npmcharts.com/compare/@rustbolt/plugin-react-refresh?minimal=true"><img src="https://img.shields.io/npm/dm/@rustbolt/plugin-react-refresh.svg?style=flat-square&colorA=564341&colorB=EDED91" alt="downloads" /></a>
  <a href="https://github.com/web-infra-dev/rustbolt/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square&colorA=564341&colorB=EDED91" alt="license" /></a>
</p>

React refresh plugin for [Rustbolt](https://github.com/web-infra-dev/rustbolt).

## Installation

First you need to install this plugin and its dependencies:

```bash
npm add @rustbolt/plugin-react-refresh react-refresh -D
# or
yarn add @rustbolt/plugin-react-refresh react-refresh -D
# or
pnpm add @rustbolt/plugin-react-refresh react-refresh -D
# or
bun add @rustbolt/plugin-react-refresh react-refresh -D
```

## Usage

Enabling [React Fast Refresh](https://reactnative.dev/docs/fast-refresh) functionality primarily involves two aspects: code injection and code transformation.

- Code injection will inject some code from the [react-refresh](https://www.npmjs.com/package/react-refresh) package, as well as some custom runtime code, all of which are integrated in this plugin and can be injected through.
- Code transformation can be added through loaders, such as [jsc.transform.react.refresh](https://swc.rs/docs/configuration/compilation#jsctransformreactrefresh) for [swc-loader](https://swc.rs/docs/usage/swc-loader) or the [react-refresh/babel](https://github.com/facebook/react/tree/main/packages/react-refresh) for [babel-loader](https://github.com/babel/babel-loader).

```js
const ReactRefreshPlugin = require("@rustbolt/plugin-react-refresh");
const isDev = process.env.NODE_ENV === "development";

module.exports = {
  experiments: {
    rustboltFuture: {
      disableTransformByDefault: true,
    },
  },
  // ...
  mode: isDev ? "development" : "production",
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: {
          loader: "builtin:swc-loader",
          options: {
            jsc: {
              parser: {
                syntax: "ecmascript",
                jsx: true,
              },
              transform: {
                react: {
                  development: isDev,
                  refresh: isDev,
                },
              },
            },
          },
        },
      },
    ],
  },
  plugins: [isDev && new ReactRefreshPlugin()].filter(Boolean),
};
```

Compared to the previous approach, this method decouples the React Fast Refresh code injection logic from the transformation logic. The code injection logic is handled uniformly by this plugin, while the code transformation is handled by loaders. This means that this plugin can be used in conjunction with `builtin:swc-loader`, `swc-loader`, or `babel-loader`.

## Example

- For usage with `builtin:swc-loader`, you can refer to the example at [examples/react-refresh](https://github.com/rustbolt-contrib/rustbolt-examples/tree/main/rustbolt/react-refresh/rustbolt.config.js), When using with `swc-loader`, simply replace `builtin:swc-loader` with `swc-loader`.
- For usage with `babel-loader`, you can refer to the example at [examples/react-refresh-babel-loader](https://github.com/rustbolt-contrib/rustbolt-examples/tree/main/rustbolt/react-refresh-babel-loader/rustbolt.config.js)

## Options

### include

- Type: [Rustbolt.RuleSetCondition](https://rustbolt.dev/config/module#condition)
- Default: `/\.([cm]js|[jt]sx?|flow)$/i`

Include files to be processed by the plugin. The value is the same as the `rule.test` option in Rustbolt.

```js
new ReactRefreshPlugin({
  include: [/\.jsx$/, /\.tsx$/],
});
```

### exclude

- Type: [Rustbolt.RuleSetCondition](https://rustbolt.dev/config/module#condition)
- Default: `/node_modules/`

Exclude files from being processed by the plugin. The value is the same as the `rule.exclude` option in Rustbolt.

```js
new ReactRefreshPlugin({
  exclude: [/node_modules/, /some-other-module/],
});
```

### forceEnable

- Type: `boolean`
- Default: `false`

Whether to force enable the plugin.

By default, the plugin will not be enabled in non-development environments. If you want to force enable the plugin, you can set this option to `true`.

```js
new ReactRefreshPlugin({
  forceEnable: true,
});
```

It is useful if you want to:

- Use the plugin in production.
- Use the plugin with the `none` mode without setting `NODE_ENV`.
- Use the plugin in environments we do not support, such as `electron-prerender` (**WARNING: Proceed at your own risk**).

### library

- Type: `string`
- Default: `output.uniqueName || output.library`

Sets a namespace for the React Refresh runtime.

It is most useful when multiple instances of React Refresh is running together simultaneously.

### overlay

- Type: `boolean | OverlayOptions`
- Default: `false`

Modify the behavior of the error overlay.

Checkout [OverlayOptions](https://github.com/rustbolt-contrib/rustbolt-plugin-react-refresh/blob/main/src/options.ts#L4) type signature for more details.

- Enable the error overlay:

```js
new ReactRefreshPlugin({
  overlay: true,
});
```

- Configure the error overlay:

```js
new ReactRefreshPlugin({
  overlay: {
    // ...
  },
});
```

## Credits

Thanks to the [react-refresh-webpack-plugin](https://github.com/pmmmwh/react-refresh-webpack-plugin) created by [@pmmmwh](https://github.com/pmmmwh), which inspires implement this plugin.

## License

`@rustbolt/plugin-react-refresh` is [MIT licensed](https://github.com/web-infra-dev/rustbolt/blob/main/LICENSE).
