// https://github.com/vuejs/vue-cli#customizing-webpack-config
const path = require("path");

module.exports = {
  baseUrl: process.env.VUE_APP_WEBPACK_BASE_URL,
  // disableHostCheck: false,
  // host: '0.0.0.0',
  // public: '',
  // compiler: true,
  lintOnSave: false,
  chainWebpack: chainableConfig => {
    // modify config with webpack-chain
    // https://github.com/mozilla-neutrino/webpack-chain

    chainableConfig.devtool("#cheap-module-source-map");
  },
  historyApiFallback: {
      verbose: false,
      rewrites: [
        // revrites
      ]
    },
  devServer: {
    proxy: {
<% if (nodeServerPresets) { %>
      "/api": {
        logLevel: "debug",
        target: "http://localhost:3000"
      },
<% } %>
    }
  }
};
