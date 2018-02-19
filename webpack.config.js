var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
    template: __dirname + '/src/index.html',
    filename: 'index.html',
    inject: 'body'
});

module.exports = {
    entry: __dirname + '/src/index.js',
    module: {
        loaders: [
            {
                test: /\.css$/,  
                exclude: /node_modules/,  
                loaders: ['style-loader', 'css-loader'],
           },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    output: {
        filename: 'script.min.js',
        path: __dirname + '/build'
    },
    devtool: 'source-map',
    plugins: [HTMLWebpackPluginConfig]
};