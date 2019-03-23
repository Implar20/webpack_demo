## webpack 安装
+ 全局安装 webpack
+ 安装本地的 webpack
+ webpack webpack-cli -D

## webpack 可以进行 0 配置
+ 打包工具 -> 输出后的结果 (JS 模块)
  + `npx webpack` 默认打包
+ 打包 (支持 JS 的模块化)

## 手动配置 webpack
+ 默认配置文件名为 `webpack.config.js`
  + `webpack` 是 `node` 写出来的，所以要用 `node` 的写法来进行配置
+ 自定义 配置文件 名称
  + `npx wepack --config webpack.config.my.js` 可以手动配置 webpack 配置文件的名字
  + 在 `package.json` 中配置 `scripts`
  + 使用 `npm run xxx` + `--` + `--config xxx.js`
```javascript
const path = require('path')

module.exports = {
    mode: 'development', // 模式 1. 开发模式：production 2. 生产模式：development
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),  // 必须是一个绝对路径
        filename: 'app.js'
    }
}
```
```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack.config.js"
}
```
```shell
npm run build
npm run build -- --config webpack.config.my.js
```

## 开发服务器的配置
```javascript
devServer: {                // 开发服务器的配置
    port: 5500,             // 端口号
    progress: true,         // 进度条
    contentBase: './dist',  // 以 'xxx' 目录作为静态服务
    open: true,             // 自动打开浏览器              
    compress: true          // gzip 压缩
}
```

## webpack plugins
+ loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。
+ 插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务
+ 使用一个 plugins 必须 `require` 它
```javascript
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
]
```

## Html 插件
+ `html-webpack-plugin`
```javascript
new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html',
    minify: {   // 压缩
        removeAttributeQuotes: true,    // 去掉双引号
        collapseWhitespace: true        // 一行显示
    },
    hash: true                      // hash 戳
})
```

## webpack loader 
+ webpack 自身只理解 JavaScript
+ loader 可以将其他类型的文件转换为 webpack 能够处理的有效模块，然后再利用 webpack 的打包能力进行处理
+ loader 的特点：希望单一  
+ loader 的用法：字符串只用一个 loader
+ 多个 loader 需要 []
+ loader 的顺序默认是 从右向左执行 从下到上
```javascript
 module: {                           // 模块
    rules: [                        // 规则
        {                           // css-loader   解析 @import 语法
            test:/\.css$/,
            use: [
                {
                    loader: 'style-loader',
                    options: {
                        insertAt: 'top'
                    }
                },
                'css-loader'
            ]
        },
        {                           // css-loader   解析 @import 语法
            test:/\.less$/,
            use: [
                {
                    loader: 'style-loader',
                    options: {
                        insertAt: 'top'
                    }
                },
                'css-loader',
                'less-loader'   
            ]
        }
    ]
}
```

## webpack 自动添加 css 前缀
+ `autoprefixer`
+ 前提是下载一个 loader 处理：`postcss-loader`
```javascript
{
    test:/\.less$/,
    use: [
        MiniCssExtractPlugin.loader,    // 抽离 css 样式 为 link 标签
        'css-loader',       // css-loader   解析 @import 语法
        'postcss-loader',   // postcss-loader 解析 css 之前就要加上前缀  
        'less-loader'       // less less-loader  less -> css 在安装 less-loader 之前，千万别忘了安装 less
    ]
}

// postcss.config.js
module.exports = {
    plugins: [require('autoprefixer')]
}
```

## 压缩 css
+ `optimize-css-assets-webpack-plugin`
```javascript
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
})
```
+ 注意：直接在 plugins 里面写入即可

## 压缩 JS 
+ `uglifyjs-webpack-plugin`
+ 或者 在 `mode` 里面直接使用 `production` 也可以
```javascript
new UglifyJs({
    cache: true,    // 缓存
    parallel: true, // 并发
    sourceMap: true // set to true if you want JS source maps   源码映射
})
```

## ES6 => ES5
+ 下载包
```json
    "babel-loader": "^8.0.5",   // loader
    "@babel/core": "^7.4.0",    // 核心
    "@babel/plugin-proposal-class-properties": "^7.4.0",    // 转换 class
    "@babel/plugin-proposal-decorators": "^7.4.0",          // 转换 修饰器
    "@babel/preset-env": "^7.4.2",                          // presets
```

```javascript
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
}
```

## 基层模块
### 全局变量引入