const {merge} = require('webpack-merge');
const packageJson = require('../package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common');

const devConfig = {
    mode: 'development',
    output: {
        publicPath: 'http://localhost:8085/'
    },
    devServer: {
        port: 8085,
        historyApiFallback: {
            index: 'index.html'
        },
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'dashboard',
            filename: 'remoteEntry.js',
            exposes: {
                './DashboardApp': './src/bootstrap',
            },
            shared: packageJson.dependencies,  
            // shared: ['react','react-dom'],  
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
    ],
};

module.exports = merge(commonConfig,devConfig);