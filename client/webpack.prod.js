var webpack = require('webpack');
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
    plugins: [
        new webpack.EnvironmentPlugin({
            HOST_URL: 'https://gymbosses.herokuapp.com' // use 'localhost' unless process.env.HOST_URL is defined
        })
    ]
};