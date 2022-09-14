const webpack = require("@nativescript/webpack");
// const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const path = require('path');

module.exports = (env) => {
  webpack.init(env);

  // webpack.chainWebpack(config => {
  //   // config.plugin('polyfills').use(NodePolyfillPlugin);
  //   config.resolve.set("fallback", {
  //     "fs": false,
  //     "net": false,
  //     "path": false, //require.resolve("path-browserify"),
  //     "zlib": false, //require.resolve("browserify-zlib"),
  //     "http": false, //require.resolve("stream-http"),
  //     "https": false, //require.resolve("https-browserify"),
  //     "stream": false, //require.resolve("stream-browserify"),
  //     "crypto": false, //require.resolve("crypto-browserify"),
  //     "domain": false, // require.resolve("domain-browser"),
  //     "vm": require.resolve("vm-browserify"),
  //     "child_process": false,
  //     "perf_hooks": false
  //   })
  // })

  // Learn how to customize:
  // https://docs.nativescript.org/webpack
  const config = webpack.resolveConfig()
  config.module.rules.push(
    {
      test: /\.elm$/,
      exclude: [/elm-stuff/, /node_modules/],
      use: [
        {
          loader: path.resolve('./wrap-loader.js') //'wrapper-loader' //
        }, {
          loader: 'elm-webpack-loader',
        },
      ]
    }
  )
  return config;
};


