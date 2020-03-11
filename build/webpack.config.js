const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')

module.exports = {
  //指定打包模式
  mode: 'development',
  entry: {
    //配置入口文件
    main: path.resolve(__dirname, '../src/main.js')
  },
  output: {
    //配置打包文件输出的目录
    path: path.resolve(__dirname,'../dist'),
    //生成的js的文件名称
    filename: 'js/[name].[hash:8].js',
    //生成的chunk名称
    chunkFilename: 'js/[name].[hash:8].js',
    //资源引用的路径
    publicPath: './'
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.runtime.esm.js'  //配置vue的别名
    },
    extensions: [
      '.js',
      '.vue'
    ]
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'cache-loader',   //缓存loader编译的结果
          },
          {
            loader: 'thread-loader'  //使用worker池来运行loader
          },
          {
            loader: 'vue-loader',   //解析.vue文件
            options: {
              compilerOptions: {
                preserveWhitespace: false   //保留空白
              }
            }
          }
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                    name: 'img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'media/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'fonts/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname,'../public/index.html')
    }),
    // 当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境。
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}