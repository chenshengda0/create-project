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
        new webpack.ProvidePlugin({
            express: "express",
            Router: ["express", "Router"],
            stream: "stream",
            createGzip: ["zlib", "createGzip"],
            fs: "fs",

            T: ["dreamer-common-def", "T"],
            getRandom: ["dreamer-common-def", "getRandom"],
            getAxis: ["dreamer-common-def", "getAxis"],
            matrix2D: ["dreamer-common-def", "matrix2D"],
            matrix3D: ["dreamer-common-def", "matrix3D"],
            matrixCss: ["dreamer-common-def", "matrixCss"],
            determinant: ["dreamer-common-def", "determinant"],
            adjoint: ["dreamer-common-def", "adjoint"],
            perspectiveNO: ["dreamer-common-def", "perspectiveNO"],
            runtimeDecorator: ["dreamer-common-def", "runtimeDecorator"],
        }),
        new webpack.DefinePlugin({
            STATICS: JSON.stringify( path.resolve( __dirname, "./src/Statics" ) ),
            TITLE: JSON.stringify( process.env.TITLE ),
            LISTEN_PORT: JSON.stringify( process.env.LISTEN_PORT ),
        })
    ],
    resolve: {
        extensions: [".js", ".json", ".ts"],
        alias: {
            'Routers': path.resolve( __dirname, "./src/Routers" ), 
            'Commons': path.resolve( __dirname, "./src/Commons" ),
        }
    },
    optimization: {
        minimize: false,
    },
}