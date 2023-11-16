const path = require( "path" )
const webpack = require( "webpack" )
const TerserPlugin = require('terser-webpack-plugin');
require( "dotenv" ).config()

module.exports = {
    stats: {
        // Configure the console output
        errorDetails: false, //this does show errors
        colors: false,
        modules: true,
        reasons: true
    },
    target: "node",
    //模式
    mode: "production",
    //devtool: false,
    //入口
    entry: {
        index: "./src/index.ts"
    },
    //目标
    output: {
        path: path.resolve( __dirname, "./build" ),
        filename: "[name].js",
        environment: {
            arrowFunction: false
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node-modules/gi,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                [
                                    "@babel/preset-env",
                                    /*
                                    {
                                        "targets":{
                                            "chrome": "58",
                                            "ie": "8"
                                        },
                                        "corejs":"3",
                                        "useBuiltIns": "usage"
                                    }
                                    */
                                ]
                            ]
                        }
                    },{
                        loader: "ts-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                //监听端口
                LISTEN_PORT: JSON.stringify( process.env.LISTEN_PORT ),
                //分片大小
                SPLIT_LIMIT: JSON.stringify( process.env.SPLIT_LIMIT ),
                //SSE 交换器名称
                EXCHANGE_NAME: JSON.stringify( process.env.EXCHANGE_NAME ),

                //RABBITMQ配置
                RABBITMQ_PROTOCOL: JSON.stringify( process.env.RABBITMQ_PROTOCOL ),
                RABBITMQ_HOSTNAME: JSON.stringify( process.env.RABBITMQ_HOSTNAME ),
                RABBITMQ_PORT: JSON.stringify( process.env.RABBITMQ_PORT ),
                RABBITMQ_USERNAME: JSON.stringify( process.env.RABBITMQ_USERNAME ),
                RABBITMQ_PASSWORD: JSON.stringify( process.env.RABBITMQ_PASSWORD ),
                RABBITMQ_LOCALE: JSON.stringify( process.env.RABBITMQ_LOCALE ),
                RABBITMQ_FRAMEMAX: JSON.stringify( process.env.RABBITMQ_FRAMEMAX ),
                RABBITMQ_HOST: JSON.stringify( process.env.RABBITMQ_HOST ),

                //MYSQL配置
                MYSQL_HOST: JSON.stringify( process.env.MYSQL_HOST ),
                MYSQL_USER: JSON.stringify( process.env.MYSQL_USER ),
                MYSQL_PORT: JSON.stringify( process.env.MYSQL_PORT ),
                MYSQL_PASSWORD: JSON.stringify( process.env.MYSQL_PASSWORD ),
                MYSQL_DATABASE: JSON.stringify( process.env.MYSQL_DATABASE ),
                MYSQL_CHARSET: JSON.stringify( process.env.MYSQL_CHARSET ),
            }
        })
    ],
    resolve: {
        extensions: ['.js', '.json', '.ts'],
    },
    //Error: Received packet in the wrong sequence.
    optimization: {
        minimize: false,
        minimizer: [new TerserPlugin({
            extractComments: false,
        })],
    }
}
