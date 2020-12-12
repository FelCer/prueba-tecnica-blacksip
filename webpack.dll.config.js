const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        modules:[
            'react',
            'react-dom',
            // '@fortawesome/fontawesome-free/js/all.js'
        ]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'frontend/dist/js'),
        library: "[name]"
    },
    plugins: [
        new webpack.DllPlugin({
            name: "[name]",
            path: path.join(__dirname, "[name]-manifest.json")
        })
    ]
}