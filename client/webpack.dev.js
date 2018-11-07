const merge = require('webpack-merge');
const common = require('./webpack.common.js');
var webpack = require('webpack');

module.exports = merge(common, {
    devServer: {
      historyApiFallback: true,
      publicPath:'/static/',
      contentBase: './',
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      }
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            HOST_URL: 'http://localhost:3000'
        })
    ]
});