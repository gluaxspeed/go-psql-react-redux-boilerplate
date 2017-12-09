const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const production = process.env.NODE_ENV ='production';

const BUILD_DIR = path.resolve(path.dirname(__dirname), 'nginx/build');
const APP_DIR = path.resolve(__dirname, 'src');

const config = {
	entry: path.join(APP_DIR + '/index.js'),
	output: {
    path: BUILD_DIR,
    publicPath: "/",
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true
    }), 
    new CopyWebpackPlugin([
        {from: './index.html'}
      ]),
    new CleanWebpackPlugin([
        BUILD_DIR,
      ])
  ],
  target: "web",
  module: {
    loaders: [
      {
        test: /\jsx?/,
        include: APP_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2017']
        }
      },
      {
        test: /\less$/,
        loader: "sytle!css!less"
      }
    ]
  },
  devtool: production ? false : "source-map",
  devServer: {
    proxy: {
      '/api/**': {
        target: 'http://server:3000',
        secure: false
      }
    },
    host: '0.0.0.0',
    port: '3000',
    watchOptions: {
      poll: true
    }
  }
};

module.exports = config;