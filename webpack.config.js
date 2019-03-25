const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCss = require('optimize-css-assets-webpack-plugin')
const UglifyJs = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    optimization: {
        // minimizer: [
        //     new UglifyJs({
        //         cache: true,    // 缓存
        //         parallel: true, // 并发
        //         sourceMap: true // set to true if you want JS source maps   源码映射
        //     })
        // ]
    },
    devServer: {                // 开发服务器的配置
        port: 5500,             // 端口号
        progress: true,         // 进度条
        contentBase: './dist',  // 以 'xxx' 目录作为静态服务
        open: true,             // 自动打开浏览器              
        compress: true          // gzip 压缩
    },
    mode: 'development', // 模式 1. 开发模式：production 2. 生产模式：development
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
                removeAttributeQuotes: true     // 去掉双引号
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'main.css'
        }),
        new OptimizeCss({
            assetNameRegExp: /\.css$/,
            cssProcessor: require('cssnano'),   // css 处理器，默认就是 cssnano
            cssProcessorOptions: {              // 指定 cssProcessor 所需的参数
                preset: ['default', {
                    discardComments: {
                        removeAll: true,
                    },
                    normalizeUnicode: false
                }]
            },
            canPrint: true                      // 是否打印处理过程中的日志
        }),
        // new webpack.ProvidePlugin({             // 提供插件 在每个模块中都注入 $
        //     $: 'jquery'
        // })
    ],
    externals:{
        jquery: '$'
    },
    module: {                           // 模块
        rules: [                        // 规则
            // {
            //     test: require.resolve('jquery'),
            //     use: 'expose-loader?$'
            // },
            {
                test: /\.js$/,
                use: {
                    loader:'babel-loader',
                    options: {
                        // 用 babel-loader 需要把 es6 转换成 es5
                        presets: [
                            '@babel/preset-env'
                        ],
                        plugins: [
                            ['@babel/plugin-proposal-decorators', { 'legacy': true }],
                            ['@babel/plugin-proposal-class-properties', { 'loose': true }]
                        ]
                    }
                }
            },
            {                           // css-loader   解析 @import 语法
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,    // 抽离 css 样式 为 link 标签
                    'css-loader',       // css-loader   解析 @import 语法
                    'postcss-loader',   // postcss-loader 解析 css 之前就要加上前缀  
                    'less-loader'       // less less-loader  less -> css 在安装 less-loader 之前，千万别忘了安装 less
                ]
            }
        ]
    }
}