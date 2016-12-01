const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const extensions = require('./src');

const entryPath = './src';
const entries = Object.keys(extensions).reduce((p, v) => {
  p[v] = `${entryPath}${extensions[v]}`;
  return p;
}, {});
module.exports = {
  entry: entries,
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name]_[chunkhash].js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: [
      'src/',
      'node_modules',
    ],
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' }
    ],
  },
  plugins: [
    new WebpackCleanupPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('[contenthash].css', {
      allChunks: true,
    }),
    new webpack.optimize.DedupePlugin(),
  ],
};
