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
    // https://www.mistergoodcat.com/post/the-joy-that-is-source-maps-with-vuejs-and-typescript

    const a = info => {
      let $filename = 'sources://' + info.resourcePath;
      if (info.resourcePath.match(/\.vue$/) && !info.allLoaders.match(/type=script/)) {
        $filename = 'webpack-generated:///' + info.resourcePath + '?' + info.hash;
      }
      return $filename;
    };

    const b = "webpack:///[resource-path]?[hash]";
    const c = "#eval-source-map";

    chainableConfig
      .devtool(c);

    chainableConfig
      .output
        .devtoolModuleFilenameTemplate(a)
        .devtoolFallbackModuleFilenameTemplate(b);
  },
  historyApiFallback: {
      verbose: false,
      rewrites: [
        // revrites
      ]
    },
  devServer: {
    proxy: {<% if (nodeServerPresets) { %>
      "/api": {
        logLevel: "debug",
        target: "http://localhost:3000"
      },
    <% } %>}
  }
};
