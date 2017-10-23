const webpack = require("webpack");

module.exports = {
  entry: './src/assets/_javascript/main.js',
  output: {
    path: `${__dirname}/assets/js`,
    filename: 'main.js'
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ],

  module:{
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['env',{modules: false}]
              ]
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  }
}
