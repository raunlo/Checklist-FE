const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: "./index.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].js" 
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
            inject: "body",
            minify: true,
        })
    ]
}