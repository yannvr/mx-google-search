module.exports = {
    devtool: 'sourcemap',
    entry: ['./bower_components/zepto/zepto.js', './bower_components/bacon/dist/Bacon.js', './app/styles.styl', './app/scripts/app.es6'],
    output: {
        path: __dirname,
        filename: './app/bundle.js'
    },
    module: {
        loaders: [
            { test: /\.es6$/, loader: 'babel-loader' },
            { test: /\.css$/, exclude: /\.useable\.css$/, loader: "style!css" },
            { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' }
        ]
    }
}
