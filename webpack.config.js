module.exports = {
  context: __dirname + "/src",
  entry: "./GoogleTrendsApi",
  output: {
      path: __dirname + "/build",
      filename: "google-trends-api.js",
      library: "googleTrends"
  },
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
  }
};
