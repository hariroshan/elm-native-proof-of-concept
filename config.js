{
  mode: 'development',
  externals: [ 'package.json', '~/package.json' ],
  externalsPresets: { node: false },
  devtool: 'inline-source-map',
  target: 'node',
  watchOptions: {
    ignored: [
      '/Users/hariroshan/Documents/booking/poc/platforms/**',
      '/Users/hariroshan/Documents/booking/poc/App_Resources/**'
    ]
  },
  ignoreWarnings: [ /System.import\(\) is deprecated/ ],
  output: {
    path: '/Users/hariroshan/Documents/booking/poc/platforms/ios/poc/app',
    pathinfo: false,
    publicPath: '',
    libraryTarget: 'commonjs',
    globalObject: 'global',
    clean: true
  },
  resolve: {
    symlinks: true,
    alias: {
      '~': '/Users/hariroshan/Documents/booking/poc/app',
      '@': '/Users/hariroshan/Documents/booking/poc/app'
    },
    extensions: [
      '.ios.ts',   '.ts',
      '.ios.js',   '.js',
      '.ios.mjs',  '.mjs',
      '.ios.css',  '.css',
      '.ios.scss', '.scss',
      '.ios.json', '.json'
    ],
    modules: [
      '/Users/hariroshan/Documents/booking/poc/node_modules',
      'node_modules'
    ]
  },
  resolveLoader: {
    modules: [
      '/Users/hariroshan/Documents/booking/poc/node_modules/@nativescript/webpack/dist/loaders',
      '/Users/hariroshan/Documents/booking/poc/node_modules/@nativescript/webpack/node_modules',
      '/Users/hariroshan/Documents/booking/poc/node_modules',
      'node_modules'
    ]
  },
  module: {
    rules: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object]
    ]
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: { cacheGroups: [Object] },
    minimizer: [ [TerserPlugin] ]
  },
  plugins: [
    PlatformSuffixPlugin { platform: 'ios' },
    ContextExclusionPlugin { negativeMatcher: /(.*)App_Resources(.*)/ },
    ContextExclusionPlugin { negativeMatcher: /\.(android)\.(\w+)$/ },
    DefinePlugin { definitions: [Object] },
    CopyPlugin { patterns: [Array], options: {} },
    WatchStatePlugin {},
    HotModuleReplacementPlugin { options: {} },
    ContextExclusionPlugin { negativeMatcher: /\b_.+\./ }
  ],
  entry: {
    bundle: [
      '@nativescript/core/globals/index',
      '/Users/hariroshan/Documents/booking/poc/node_modules/@nativescript/webpack/dist/stubs/virtual-entry-javascript',
      '@nativescript/core/bundle-entry-points',
      '/Users/hariroshan/Documents/booking/poc/app/app.js'
    ],
    'tns_modules/inspector_modules': [ '@nativescript/core/inspector_modules' ]
  }
}
