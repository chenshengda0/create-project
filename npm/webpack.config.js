const path = require( "path" )
const webpack = require( "webpack" )
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
                LISTEN_PORT: JSON.stringify( process.env.LISTEN_PORT ),
                EXCHANGE_NAME: JSON.stringify( process.env.EXCHANGE_NAME ),

                RABBITMQ_PROTOCOL: JSON.stringify( process.env.RABBITMQ_PROTOCOL ),
                RABBITMQ_HOSTNAME: JSON.stringify( process.env.RABBITMQ_HOSTNAME ),
                RABBITMQ_PORT: JSON.stringify( process.env.RABBITMQ_PORT ),
                RABBITMQ_USERNAME: JSON.stringify( process.env.RABBITMQ_USERNAME ),
                RABBITMQ_PASSWORD: JSON.stringify( process.env.RABBITMQ_PASSWORD ),
                RABBITMQ_LOCALE: JSON.stringify( process.env.RABBITMQ_LOCALE ),
                RABBITMQ_FRAMEMAX: JSON.stringify( process.env.RABBITMQ_FRAMEMAX ),
                RABBITMQ_HOST: JSON.stringify( process.env.RABBITMQ_HOST ),
            }
        })
    ],
    resolve: {
        extensions: ['.js', '.json', '.ts'],
    },
}
