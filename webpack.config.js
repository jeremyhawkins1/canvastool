const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry:    './src/index.js',
  output:   {
    path:       Path.join(__dirname, '/build'),
    filename:   'mailer.bundle.js'
  },
  module: {
    rules: [
      {
        test:       /\.js$/,
        exclude:    /node_modules/,
        use: {
          loader:   'babel-loader'
        }
      },
      {
        test:       /\.(scss|css)$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test:     /\.(png|jpg|gif)$/,
        use: [
          {
            loader:   "file-loader",
            options: {
              outputPath:   'assets/img/'
            }
          }
        ]
      },
      {
        test:     /\.otf$/,
        use: [
          {
            loader:   "file-loader",
            options: {
              outputPath:   'assets/fonts/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'  
    }),
    new Dotenv()
  ],
  devServer: {
    clientLogLevel: 'info',
  }
}


