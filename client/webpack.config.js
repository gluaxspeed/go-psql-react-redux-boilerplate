const CircularDependencyPlugin = require('circular-dependency-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const BUILD_DIR = path.resolve(path.dirname(__dirname), '../nginx/build');
const APP_DIR = path.resolve(path.dirname(__dirname), 'client/src');

const config = (env, argv) => {
  console.log(argv.mode)
  return {
    mode: process.env.NODE_ENV, 

    entry: { 'app': path.join(APP_DIR + '/index.js') },

    output: {
      path: BUILD_DIR,
      publicPath: '/',
      filename: '[name].js',
      chunkFilename: '[name].chunk.js'
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            'babel-loader'
          ]
        },

        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
          'style-loader',
          'sass-loader'
          ]
        },

        {
          test: /\.css$/,
          use: [
          'style-loader',
          'css-loader'
          ]
        },

        {
          test: /\.(eot|svg|otf|ttf|woff|woff2)$/,
          use: 'file-loader',
        },

        {
          test: /\.(jpg|png|gif)$/,
          use: [
            'file-loader',
            {
              loader: 'image-webpack-loader',
              options: {
                query: {
                  gifsicle: {
                    interlaced: true
                  },
                  mozjpeg: {
                    progressive: true
                  },
                  optipng: {
                    optimizationLevel: 7
                  },
                  pngquant: {
                    quality: '65-90',
                    speed: 4
                  }
                }
              },
            },
          ],
        },

        {
          test: /\.html$/,
          use: 'html-loader'
        },

        {
          test: /\.json$/,
          use: 'json-loader'
        },

        {
          test: /\.(mp4|webm)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000
            },
          },
        },

      ]
    },

    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: 'src/index.html'
      }),

      new CircularDependencyPlugin({
        exclude: /a\.js|node_modules/, // exclude node_modules
        failOnError: false // show a warning when there is a circular dependency
      }),

      new webpack.HotModuleReplacementPlugin(),

      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV = argv.mode)
        }
      })
    ],

    devtool: 'eval-source-map',

    devServer: {
      proxy: {
        '/api/**': {
          target: 'http://server:3000',
          secure: false
        }
      },
      host: 'localhost',
      port: '3000',
      watchOptions: {
        poll: true
      },
      hot: true,
      historyApiFallback: true,
      noInfo: false,
      stats: 'minimal'
    }
  }
};

module.exports = config;