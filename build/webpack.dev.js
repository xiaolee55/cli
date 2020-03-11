// 不需要压缩代码
// 需要热更新
// css不需要提取到css文件
// sourceMap
//...

const merge = require('webpack-merge')  //合并webpack配置
const webpackConfig = require('./webpack.config')  //
const webpack = require('webpack')
module.exports = merge(webpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 2
            }
          },
          {
            loader: "sass-loader",
            options: {
              implementation: require("dart-sass")
            }
          },
          {
            loader: "postcss-loader"
          }
        ]      
      }
    ]
  },
  devServer: {
    hot: true,
    port: 3000,
    contentBase: './dist'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
  ]
})
