const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');



const PATHS = {
    source: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build')
};

module.exports = {
    entry: {
        'index': PATHS.source + '/script.js'
    },

    devtool: 'source-map',

    output: {
        path: PATHS.build,
        filename: './js/script.js'
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     filename: 'index.html',
        //     chunks: ['index', 'common'],
        //     template: PATHS.source + '/index.pug'
        // }),
        new CleanWebpackPlugin('build'),
        new ExtractTextPlugin('./css/style.css'),
        new OptimizeCssAssetsPlugin({
            cssProcessorOptions: { discardComments: {removeAll: true } }
        }),
        new UglifyJSPlugin({
            sourceMap: true
        })        
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['babel-preset-env']
                  }
                }
            },
            // {
            //     test: /\.pug$/,
            //     loader: 'pug-loader',
            //     options: {
            //         pretty: true
            //     }
            // },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    publicPath: '../',
                    use: ['css-loader','sass-loader'],
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.(jpg|png|svg)$/,
                loader: 'file-loader',
                options: {
                    name: 'img/[name].[ext]'
                }
            },
            {
                test: /\.html$/,
                loader: 'file-loader',
                options: {
                    name: './[name].[ext]'
                }
            }                                    
        ]
    }
};
