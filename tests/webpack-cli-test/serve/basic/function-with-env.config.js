const WebpackCLITestPlugin = require("../../utils/webpack-cli-test-plugin");

module.exports = (env) => {
  console.log(env);

  return {
    mode: "development",
    devtool: false,
    plugins: [new WebpackCLITestPlugin(["mode"], false, "hooks.compilation.taps")],
    devServer: {
      client: {
        logging: "info",
      },
    },
  };
};
