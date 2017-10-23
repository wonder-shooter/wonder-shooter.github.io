const webpack = require("webpack");

module.exports = {
  entry: './src/assets/_javascript/main.js',
  output: {
    path: `${__dirname}/htdocs/assets/js`,
    filename: 'main.js'
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default']
    })
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
