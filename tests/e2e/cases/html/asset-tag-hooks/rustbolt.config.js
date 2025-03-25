const {rustbolt} = require("@rustbolt/core");

/** @type { import('@rustbolt/core').RustboltOptions } */
module.exports = {
  context: __dirname,
  mode: "development",
  entry: "./src/index.js",
  stats: "none",
  plugins: [
    new rustbolt.HtmlRustboltPlugin({
      template: "./src/index.html"
    }),
    {
      /** @param {import('@rustbolt/core').Compiler} compiler */
      apply(compiler) {
        compiler.hooks.compilation.tap("TestPlugin", (compilation) => {
          rustbolt.HtmlRustboltPlugin.getCompilationHooks(compilation).alterAssetTags.tap("TestPlugin", (data) => {
            data.assetTags.scripts.push({
              tagName: 'script',
              innerHTML: 'console.log("injected source code");',
              voidTag: false,
              attributes: {id: 'inner-html-tag'},
            })
            return data;
          });
        });
      }
    }
  ],
  devServer: {
    port: 3000
  }
};
