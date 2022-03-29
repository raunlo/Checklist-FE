const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
          },
        ],
      },
    mode: 'production',
    entry: "./src/flappybirdts/index.ts",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].js" 
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/flappybirdts/index.html",
            inject: "body",
            minify: false,
        })
    ]
}