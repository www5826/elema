var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'components':path.resolve(__dirname,'../src/components'),
      'common':path.resolve(__dirname,'../src/common')
    }
  },
  module: {
    rules: [{
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      exclude: /node_modules/,
      enforce: "pre",
      include: [resolve('src'), resolve('test')],
      options: {
        formatter: require('eslint-friendly-formatter')
      }
    }, {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: vueLoaderConfig,
      exclude: /node_modules/,
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      include: [resolve('src'), resolve('test')]
    },
      {
      test: /\.(woff|svg|eot|ttf)\??.*$/,
      exclude: /node_modules/,
      loader: 'url-loader',
      query: {
        limit: 10000,
        name: utils.assetsPath('../../fonts/[name].[hash:7].[ext]')
      }
    },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        exclude: /node_modules/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.s[a|c]ss$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader!scss-loader'
      }
    ]
  }
};
