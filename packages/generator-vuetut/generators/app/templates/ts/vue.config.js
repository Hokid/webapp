// https://github.com/vuejs/vue-cli#customizing-webpack-config
const path = require("path");

module.exports = {
  baseUrl: process.env.VUE_APP_WEBPACK_BASE_URL,
  // runtimeCompiler: true,
  lintOnSave: false,
  chainWebpack: chainableConfig => {
    // modify config with webpack-chain
    // https://github.com/mozilla-neutrino/webpack-chain
    // https://www.mistergoodcat.com/post/the-joy-that-is-source-maps-with-vuejs-and-typescript
  },
  devServer: {
    historyApiFallback: {
      verbose: false,
      rewrites: [
        // revrites
      ]
    },
    proxy: {<% if (nodeServerPresets) { %>
      "/api": {
        // logLevel: "debug",
        target: "http://localhost:3000"
      },
    <% } %>}
  }
};
