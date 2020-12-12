const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: {
        home: path.resolve(__dirname, './frontend/src/js/index.js')
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'frontend/dist'),
        publicPath: path.resolve(__dirname, 'frontend/dist'),
    },
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ]
                    }
                }
            },
            {
                exclude: /node_modules/,
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                exclude: /node_modules/,
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                exclude: /node_modules/,
                test: /\.(png|jpg|gif|woff|eot|ttf|svg|otf)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 255000//limite de peso del archivo. BITS 
                    }
                }
            },
            {
                test: /\.json$/
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        new webpack.DllReferencePlugin({
            manifest: require(path.resolve(__dirname, './modules-manifest.json'))
        })
    ],
    devServer: {
        //contentBase: './dist',
        port: 8080,
        publicPath: '/'
    }
}