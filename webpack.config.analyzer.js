'use strict';

const prod = require('./webpack.config')();
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = function () {

    return Object.assign(prod, {
        plugins: [
            ...prod.plugins,
            new BundleAnalyzerPlugin()
        ]
    });
};
