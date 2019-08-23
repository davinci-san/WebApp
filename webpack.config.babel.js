


import path from 'path';
import webpack from 'webpack';

export default {

  mode  : 'development',
  entry : './src/main.js',

  output : {
    path : path.resolve( __dirname, 'publics' ),
    filename : 'main.bundle.js',
  },

  module : {
    rules : [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', options: { sourceMap: true } },
      { test: /\.jsx?/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.(png|woff|woff2|eot|ttf|svg|jpg|gif)$/, loader: 'url-loader?limit=100000' },
      { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader' },
    ]
  },

  devtool: 'inline-source-map',
  devServer: { contentBase: './publics' },

};