const merge = require('webpack-merge');
const common = require('./webpack.common.js');
var webpack = require('webpack');

module.exports = merge(common, {
    plugins: [
        new webpack.EnvironmentPlugin({
            HOST_URL: 'https://gymbosses.herokuapp.com'
        })
    ]
});