var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/app.js",
    worker: './src/worker.js'
  },

  output: {
    path: './dist',
    filename: "app.js"
  },

  resolve: {
    root: [
      path.join(__dirname, "src"),
      path.join(__dirname, "node_modules")
    ]
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel"
      },
      {
        test: /\.css/,
        loader: ExtractTextPlugin.extract("style", "css")
      },
      {
        test: /\.less/,
        loader: ExtractTextPlugin.extract("style", "css!less")
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: "file?name=fonts/[name].[ext]"
      },
      {
        test: /\.(png|jpg)$/,
        loader: "file?name=images/[name].[ext]"
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin("styles.css", {
      allChunks: true
    })/*,
    new webpack.optimize.CommonsChunkPlugin("worker", "worker.js")*/
  ]
};