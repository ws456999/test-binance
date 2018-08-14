'use strict'
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    index: ['./src/index.tsx']
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash:8].js',
    publicPath: '/',
    libraryTarget: 'umd',
  },
  resolve: {
    // 自动解析文件扩展名(补全文件后缀)(从左->右)
    // import hello from './hello'  （!hello.js? -> !hello.vue? -> !hello.json）
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    alias: {
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        include: resolve('src'),
        use: ['awesome-typescript-loader']
      },
      {
        test: /\.css$/,
        // include: /node_modules/,
        use: [
          {
            // loader: 'style-loader'
            loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          },
          {
            loader: require.resolve('css-loader'),
            options: {
              modules: true,
              localIdentName: '[name]-[local]-[hash:base64:5]',
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: ('assets/[name].[hash:7].[ext]'),
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          // name: ('assets/media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          // name: ('assets/fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: './src/assets/',
      to: 'assets'
    }]),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      watch: resolve('src'),
      tsconfig: resolve('tsconfig.json'),
      tslint: resolve('tslint.json')
    })
  ]
  // node: {
  //   // prevent webpack from injecting useless setImmediate polyfill because Vue
  //   // source contains it (although only uses it if it's native).
  //   setImmediate: false,
  //   // prevent webpack from injecting mocks to Node native modules
  //   // that does not make sense for the client
  //   dgram: 'empty',
  //   fs: 'empty',
  //   net: 'empty',
  //   tls: 'empty',
  //   child_process: 'empty'
  // }
}