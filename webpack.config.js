var webpack = require('webpack');

module.exports = {
  entry: "./index",
  output: {
      path: __dirname + "/build",
      filename: "google-trends-api.js",
      library: "googleTrends"
  },
  devtool: "eval-cheap-source-map",
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
        new webpack.optimize.UglifyJsPlugin({
          sourceMap: true,
          warning: false,
        }),
    ],
};
