const TerserPlugin = require( "terser-webpack-plugin" )
const webpack = require( "webpack" )
const path = require( "path" )
require('dotenv').config()

module.exports = {
    resolve: {
        extensions: [".js", ".json", ".ts"],
        fallback: {
            stream: require.resolve( 'stream-browserify' ),
            buffer: require.resolve('buffer/'),
	    },
    },
    performance:{
        hints: false,
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            extractComments: false, //不将注释提取到单独的文件中
        })]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/gi,
                use: [
                    /*
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                [
                                    "@babel/preset-env",//指定环境插件
                                ]
                            ]
                        }
                    },*/
                    {
                        loader: "ts-loader",
                    }
                ]
            },

            {
                test: /\.(png)|(jpg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 30 * 1024 * 1024,
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: "process/browser",
            Buffer: [ "buffer", "Buffer" ],
        }),
        new webpack.DefinePlugin({
            "process.env" : {
                DEV_PORT: JSON.stringify( process.env.DEV_PORT ),
                ENR: JSON.stringify( process.env.ENR ),
                ENG: JSON.stringify( process.env.ENG ),
                ENB: JSON.stringify( process.env.ENB ),
                MATRIX: JSON.stringify( process.env.MATRIX ),
            }
        }),
    ]
}