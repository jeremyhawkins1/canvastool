const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    })
  ],
  devServer: {
    clientLogLevel: 'info',
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
    proxy: {
      '/canvas/api': {
        target: 'https://hccs.test.instructure.com/api/v1/',
        pathRewrite: {'^/canvas/api' : ''}
      }
    }
  }
}


