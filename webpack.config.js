var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin"); //css单独打包
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html

const svgDirs = [
    require.resolve('antd-mobile').replace(/warn\.js$/, ''), // 1. 属于 antd-mobile 内置 svg 文件
    path.resolve(__dirname, 'src/images') // 2. 自己私人的 svg 存放目录
];

module.exports = {
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        path: __dirname + '/build',
        filename: 'js/[name].bundle.js', //打包后输出文件的文件名
        // publicPath:__dirname+'./public',
        chunkFilename: 'js/[name].[chunkhash:5].chunk.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: [{
                loader: 'babel-loader'
            }],
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'postcss-loader']
            })
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'postcss-loader', 'sass-loader']
            })
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: ['file-loader?limit=8192&name=images/[name].[ext]']
        }, {
            test: /\.(svg)$/i,
            use: 'svg-sprite-loader',
            include: svgDirs
        }]
    },
    devServer: {
        port: 3000,
        historyApiFallback: true, //不跳转
        inline: true, //实时刷新
        proxy: {

        }
    },
    plugins: [
        new ExtractTextPlugin('main.css'),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: function() {
                    return [
                        require('autoprefixer')({
                            browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4']
                        }),
                        require('postcss-pxtorem')({
                            rootValue: 100,
                            propWhiteList: []
                        }),
                    ];
                }
            }
        }),
        new HtmlWebpackPlugin({
            title: 'hello react.js',
            filename: './index.html',
            template: './src/template/index.html',
            hash: true
        }),
        new webpack.ProvidePlugin({
            axios: 'axios'
        })
    ],
    resolve: {
        modules: ['node_modules', path.join(__dirname, '../node_modules')],
        extensions: ['.web.js', '.js', '.json'],
        alias: {}
    },
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
        // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })

    ])
}