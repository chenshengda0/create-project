const path  = require('path')
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
require('dotenv').config()
//const HtmlWebpackPlugin = require('html-webpack-plugin')
// webpack中所有配置信息都应该写在module.exports中
module.exports = ()=>{
    return {
        stats: {
            // Configure the console output
            errorDetails: false, //this does show errors
            colors: false,
            modules: true,
            reasons: true
        },
        target: "node",
        mode: "production",
        // 入口文件
        //entry:"./src/test.ts",
        entry: {
            index: './src/index.ts'  // 打包输出的chunk名为entry2
        },
        devtool: false,

        // 指定打包文件输出的路径
        output: {
            path: path.resolve(__dirname,'./build'),
            // 打包后的文件
            filename: '[name].js',
        },
        plugins: [
            //全局变量
            new webpack.DefinePlugin({
                "process.env": {
                    LISTEN_PORT: JSON.stringify( process.env.LISTEN_PORT ),

                    EXCHANGE_NAME: JSON.stringify( process.env.EXCHANGE_NAME ),
    
                    RABBITMQ_PROTOCOL: JSON.stringify(process.env.RABBITMQ_PROTOCOL),
                    RABBITMQ_HOSTNAME: JSON.stringify(process.env.RABBITMQ_HOSTNAME),
                    RABBITMQ_PORT: JSON.stringify(process.env.RABBITMQ_PORT),
                    RABBITMQ_USERNAME: JSON.stringify(process.env.RABBITMQ_USERNAME),
                    RABBITMQ_PASSWORD: JSON.stringify(process.env.RABBITMQ_PASSWORD),
                    RABBITMQ_LOCALE: JSON.stringify(process.env.RABBITMQ_LOCALE),
                    RABBITMQ_FRAMEMAX: JSON.stringify(process.env.RABBITMQ_FRAMEMAX),
                    RABBITMQ_HOST: JSON.stringify(process.env.RABBITMQ_HOST),
    
                    //ADMIN_ADDRESS: JSON.stringify("0x41c223729938df06a16519a068D6e4A0B415950C"),
    
                    BSC_BASE_URL: JSON.stringify( "wss://dstream.binance.com" )
                }
            }),
            //报错
            new webpack.IgnorePlugin({
                resourceRegExp: /^electron$/
            }),
        ],
        // 指定webpack打包时使用的模块
        module:{
            // 指定要加载的规则
            rules:[
                {
                    // 指定的是规则生效的文件
                    test: /\.ts$/,
                    // 要排除的文件
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
                }
            ]
        },
        resolve: {
            extensions: ['.js', '.json', '.ts'],
        },
        optimization: {
            minimize: true,
            minimizer: [new TerserPlugin({
                extractComments: false,
            })],
        },
        performance : {
            hints : false
        }
    }
}
