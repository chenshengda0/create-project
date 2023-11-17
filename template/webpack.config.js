const path = require( "path" )
const webpack = require( "webpack" )
require("dotenv").config()
module.exports = {
    target: "node",
    mode: "production",
    devtool: false,
    entry: {
        index: "./src/index.ts",
    },
    output: {
        path: path.resolve( __dirname, "./dist" ),
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node-modules/gi,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                TITLE: JSON.stringify( process.env.TITLE ),
                LISTEN_PORT: JSON.stringify( process.env.LISTEN_PORT ),
            }
        })
    ],
    resolve: {
        extensions: [".js", ".json", ".ts"],
    },
    optimization: {
        minimize: false,
    },
}