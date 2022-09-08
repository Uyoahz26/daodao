const path = require('path')
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ROOT_PATH = path.resolve(__dirname)
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist')
const packageinfo = require('./package.json').version

module.exports = {
  mode: 'production',
  module: {
    rules: [
      { test: /\.vue$/, loader: 'vue-loader' },
      { test: /\.css$/, use: ['vue-style-loader', 'css-loader'] },
      { test: /\.svg$/, loader: 'svg-inline-loader' },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-transform-modules-commonjs',
              '@babel/transform-runtime'
            ]
          }
        }
      }
    ]
  },
  entry: {
    /* eslint-disable-next-line quote-props */
    'ispeak-bber-md': './src/js/main-md.js',
    'qexo-dao': './src/js/main.js'
  },
  output: {
    path: BUILD_PATH,
    filename: '[name].min.js',
    library: 'ispeakBber',
    libraryTarget: 'umd'
  },
  target: ['web', 'es5'],
  plugins: [
    new webpack.BannerPlugin(`package version: ${packageinfo}`),
    new CopyPlugin({
      patterns: [{ from: 'demo/', to: './' }]
    }),
    new VueLoaderPlugin()
  ],
  devServer: {
    static: [
      {
        directory: BUILD_PATH,
        publicPath: '/dist/',
        serveIndex: true,
        watch: true
      }
    ],
    port: 5200,
    host: 'localhost',
    open: true,
    hot: true,
    compress: true
  },
  performance: {
    maxEntrypointSize: 524288,
    maxAssetSize: 524288
  }
}
