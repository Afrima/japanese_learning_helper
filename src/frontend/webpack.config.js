const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: './src/index.tsx',
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    performance: {
        hints: process.env.NODE_ENV === 'production' ? "warning" : false
    },
    devtool:'inline-source-map',
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: [/.*\.test.*/, /node_modules/],
                use: {
                    loader: "ts-loader"
                }
            },
            {
                test: /\.css$/,
                exclude: [/node_modules/],
                use: ['style-loader', "css-loader"]
            },
            {
                loader: require.resolve('file-loader'),
                exclude: [/\.(css|js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
                options: {
                    name: 'static/media/[name].[hash:8].[ext]',
                },
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin(
            Object.assign(
                {},
                {
                    inject: true,
                    template: "./public/index.html",
                }, process.env.NODE_ENV === 'production' ? {
                    minify: {
                        removeComments: true,
                        collapseWhitespace: true,
                        removeRedundantAttributes: true,
                        useShortDoctype: true,
                        removeEmptyAttributes: true,
                        removeStyleLinkTypeAttributes: true,
                        keepClosingSlash: true,
                        minifyJS: true,
                        minifyCSS: true,
                        minifyURLs: true,
                    },
                } : undefined
            )
        )],
    devServer: {
        port: 3001,
        inline: true,
        hot: true,
        contentBase: ['./src', './public'],
        watchContentBase: true,
        proxy: {
            "**": {
                changeOrigin: true,
                target: "http://localhost:8080"
            }
        }
    }
};