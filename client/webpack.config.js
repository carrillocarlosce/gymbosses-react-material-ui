module.exports = {
    "entry": "./src/index.js",
    "output": {
        "path": __dirname+'/static',
        "filename": "bundle.js"
    },
    "module": {
        "rules": [
            {
                "test": /\.js$/,
                "exclude": /node_modules/,
                "use": {
                    "loader": "babel-loader",
                    "options": {
                        "presets": [
                            "@babel/preset-react"
                        ]
                    }
                }
            }
        ]
    },
    devServer: {
      historyApiFallback: true,
      publicPath:'/static/',
      contentBase: './',
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      }
    }
};