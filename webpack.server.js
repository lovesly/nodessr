
const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const webpackNodeExternals = require('webpack-node-externals');

const config = {
    mode: 'development',
    target: 'node',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    // 可是关于 externals 的文章不多，不知道什么原理
    externals: [webpackNodeExternals()]
};

module.exports = merge(baseConfig, config);