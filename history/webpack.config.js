const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    devServer: {                // 开发服务器的配置
        port: 5500,             // 端口号
        progress: true,         // 进度条
        contentBase: './dist',  // 以 'xxx' 目录作为静态服务
        open: true,             // 自动打开浏览器              
        compress: true          // gzip 压缩
    },
    mode: 'production', // 模式 1. 开发模式：production 2. 生产模式：development
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),  // 必须是一个绝对路径 
        filename: 'app.js'                      // 也可以在生成的文件名中加入 hash 戳   'app.[hash].js' 如果不想显示太多，可以[hash:8]这样表示
    },
    plugins: [  // 数组 放着所有的 webpack 插件
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            minify: {   // 压缩
                removeAttributeQuotes: true,    // 去掉双引号
                collapseWhitespace: true        // 一行显示
            },
            hash: true                      // hash 戳
        })
    ],
    module: {                           // 模块
        rules: [                        // 规则
            {                          
                test:/\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            insertAt: 'top'
                        }
                    },
                    'css-loader'        // css-loader   解析 @import 语法
                ]
            },
            {
                test:/\.less$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            insertAt: 'top'
                        }
                    },
                    'css-loader',       // css-loader   解析 @import 语法
                    'less-loader'       // less less-loader  less -> css 在安装 less-loader 之前，千万别忘了安装 less
                ]
            }
        ]
    }
}