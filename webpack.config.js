const webpack = require('webpack');
const isProduction = process.env.NODE_ENV === "production";

const prodProps = !isProduction ? [] : [
  new webpack.optimize.ModuleConcatenationPlugin()
];

module.exports = {
  entry: [
    'babel-polyfill',
    './src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'env', 'stage-1'],
          plugins: [
            ["transform-regenerator", {
              "asyncGenerators": true,
              "generators": true,
              "async": true
            }],
            "syntax-async-functions"
          ]
        }
      },
      {
        test: /\.css$/,
        loader: 'style!css!'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    port: 8080,
    contentBase: './'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development')
    }),
    ...prodProps
  ]
};