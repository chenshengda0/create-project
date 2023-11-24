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
        alias: {
            Components: path.resolve( __dirname, "src/Components" ),
            Common: path.resolve( __dirname, "src/Common" ),
            Pages: path.resolve( __dirname, "src/Pages" ),
            Reduxs: path.resolve( __dirname, "src/Reduxs" )
        }
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
                test: /\.(png)|(jpg)|(webp)|(gif)$/,
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
            DEV_PORT: JSON.stringify( process.env.DEV_PORT ),
            ENR: JSON.stringify( process.env.ENR ),
            ENG: JSON.stringify( process.env.ENG ),
            ENB: JSON.stringify( process.env.ENB ),
            MATRIX: JSON.stringify( process.env.MATRIX ),

            //store
            SET_COLOR_STORE: JSON.stringify( process.env.SET_COLOR_STORE ),
            SET_BLOB_STORE: JSON.stringify( process.env.SET_BLOB_STORE ),
        }),
    ]
}