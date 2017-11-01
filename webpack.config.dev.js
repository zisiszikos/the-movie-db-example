const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const AssetsPlugin = require('assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    cache: true,
    devtool: 'cheap-source-map',
    entry: {
        'bundle': [
            'babel-polyfill',
            path.resolve(process.cwd(), 'app/src/index.react.js')
        ]
    },
    output: {
        path: path.resolve(process.cwd(), 'app/public/dist'),
        filename: '[name].js'
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
        new ExtractTextPlugin('styles.css'),
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
        })
    ]
};
