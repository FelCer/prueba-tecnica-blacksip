const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env) => {
    var plugins = [
        new MiniCssExtractPlugin({
            filename: "./css/[name].[fullhash].css",
            chunkFilename: "[id].[fullhash].css"
        })
    ]

    if (env.NODE_ENV === 'production') {
        plugins.push(
            new CleanWebpackPlugin()
        );
    }

    // Try the environment variable, otherwise use root
    const ASSET_PATH = process.env.ASSET_PATH || '/';

    return {
        mode: 'production',
        entry: {
            home: path.resolve(__dirname, './frontend/src/js/index.js')
        },
        output: {
            filename: 'js/[name].[fullhash].js',
            path: path.resolve(__dirname, './frontend/dist'),
            publicPath: path.resolve(__dirname, './frontend/dist') + "/",
            chunkFilename: 'js/[id].[chunkhash].js',
            publicPath: ASSET_PATH
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
                    test: /\.(scss|sass)$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
                },
                {
                    exclude: /node_modules/,
                    test: /\.(png|jpg|gif|woff|eot|ttf|svg|otf|woff2)$/,
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
        devServer: {
            publicPath: '/'
        },
        plugins
    }
}