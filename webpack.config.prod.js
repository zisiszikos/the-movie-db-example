const webpack = require('webpack');
const path = require('path');
const pkg = require(path.join(__dirname, './package.json'));
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const AssetsPlugin = require('assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    cache: false,
    devtool: false,
    entry: {
        'bundle': [
            'babel-polyfill',
            path.resolve(process.cwd(), 'app/src/index.react.js')
        ]
    },
    output: {
        path: path.resolve(process.cwd(), 'app/public/dist'),
        filename: '[name].[hash].js'
    },
    resolve: {
        modules: [
            path.resolve(process.cwd(), 'app/src'),
            path.resolve(process.cwd(), 'node_modules')
        ]
    },
    module: {
        strictExportPresence: true,
        rules: [{
            test: /(\.js)$/,
            include: path.resolve(process.cwd(), 'app/src'),
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader'
            }, {
                loader: 'eslint-loader'
            }]
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader',
                    options: {
                        minimize: true
                    }
                }, {
                    loader: 'sass-loader'
                }]
            })
        }]
    },
    plugins: [
        new CleanWebpackPlugin([path.resolve(process.cwd(), 'app/public/dist')]),
        new AssetsPlugin({
            filename: 'webpack-assets.json',
            path: process.cwd(),
            prettyPrint: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            minimize: true,
            compress: {
                screw_ie8: true,
                drop_debugger: true,
                warnings: false,
                drop_console: true
            },
            mangle: {
                screw_ie8: true
            },
            output: {
                comments: false,
                screw_ie8: true
            }
        }),
        new ExtractTextPlugin('styles.[hash].css'),
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
        }),
        new webpack.BannerPlugin({
            banner: `Copyright 2017 ${pkg.author} | ${pkg.name}, version ${pkg.version}, released ${new Date().toUTCString()}`, // jscs:ignore maximumLineLength
            raw: false
        })
    ]
};
