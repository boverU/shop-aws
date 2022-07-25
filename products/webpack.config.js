const slsw = require("serverless-webpack");
const nodeExternals = require("webpack-node-externals");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: slsw.lib.entries,
    target: "node",
    devtool: "source-map",
    externals: [nodeExternals()],
    mode: slsw.lib.webpack.isLocal ? "development" : "production",
    optimization: {
        concatenateModules: false
    },
    performance: {
        hints: false
    },
    module: {
        rules: [
            {
                test: [/\.js$/, /\.json$/],
                loader: "babel-loader",
                include: __dirname,
                exclude: /node_modules/
            }
        ]
    },
    plugins: [new CopyPlugin({
        patterns: [
            { from: './mockData.json', to: 'mockData.json' },
            { from: './dbconfig', to: 'dbcConfig.json' }
        ]
    }
    )]
};