const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, './commonjs'),
    filename: 'index.js',
    library: 'ItemsLoadGenerator',
    libraryTarget: 'commonjs2'
  },
  externals: [
    /^@babel\/runtime/, /^core-js/, /^regenerator-runtime/
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'babel-loader'
      }
    ]
  }
};
