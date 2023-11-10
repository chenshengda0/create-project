const TerserPlugin = require( "terser-webpack-plugin" )
const webpack = require( "webpack" )
require('dotenv').config()

module.exports = {

    resolve: {
        extensions: [".js", ".json", ".ts"],
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
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                [
                                    "@babel/preset-env",//指定环境插件
                                    {//配置信息
                                        "targets":{
                                            "chrome": "58",
                                            "ie": "11"
                                        },
                                        "corejs":"3",
                                        "useBuiltIns": "usage"
                                    }
                                ]
                            ]
                        }
                    },
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
        new webpack.DefinePlugin({
            "process.env": {
                DEV_PORT: JSON.stringify( process.env.DEV_PORT ),
                ENR: JSON.stringify( process.env.ENR ),
                ENG: JSON.stringify( process.env.ENG ),
                ENB: JSON.stringify( process.env.ENB ),
                MATRIX: JSON.stringify( process.env.MATRIX ),
            }
        })
    ]
}