var path = require('path');
module.exports = {
    devtool: 'sourcemap',
    entry: ['./bower_components/zepto/zepto.js', './bower_components/bacon/dist/Bacon.js', './app/app.es6'],
    output: {
        path: __dirname,
        filename: './app/bundle.js'
    },
    module: {
        loaders: [
            {
                test: /.es6$/,
                loader: 'babel-loader'
            }
        ]
    }
};
