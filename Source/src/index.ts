#!/use/bin/env node
import { EventEmitter } from 'events';
const http = require("http")

const source = new EventEmitter();

http.createServer(function (req:any, res:any){
    res.setHeader( "Access-Control-Allow-Origin", "*" )
    res.setHeader("Content-Type", "text/event-stream;charset=utf-8");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    source.on( "push", function(data){
        //res.write("event: " + String(event) + "\n" + "data: " + JSON.stringify(data) + "\n\n");
        return res.write("data: " + JSON.stringify(data) + "\n\n");
    } )
}).listen( process.env.LISTEN_PORT );

//引入模块
new Promise( (resolve,reject)=> resolve( require("amqplib/callback_api") ) )
//获取amqp
.then( (amqp) => new Promise( (resolve, reject) => resolve( Object.assign( {}, {amqp} ) ) ) )
//创建连接
.then( (client:any) => new Promise( (resolve, reject) =>  client.amqp.connect( {
    protocol: process.env.RABBITMQ_PROTOCOL,
    hostname: process.env.RABBITMQ_HOSTNAME,
    port: process.env.RABBITMQ_PORT,
    username: process.env.RABBITMQ_USERNAME,
    password: process.env.RABBITMQ_PASSWORD,
    locale: process.env.RABBITMQ_LOCALE,
    frameMax: process.env.RABBITMQ_FRAMEMAX,
    host: process.env.RABBITMQ_HOST,
}, (err:any, connection:any) => err ? reject(err) : resolve( Object.assign( client, {connection} ) ) ))  )
//创建信道
.then( (client:any) => new Promise( (resolve,reject) =>  client.connection.createChannel( ( err:any, channel:any ) => err ? reject(err) : resolve( Object.assign( client, {channel}) ) )) )
//声明交换器名称
.then( (client:any) => new Promise( (resolve,reject) => resolve( Object.assign( client, {exchange: process.env.EXCHANGE_NAME} ) ) ) )
//声明交换器
.then( (client:any) => new Promise( (resolve, reject) => client.channel.assertExchange(client.exchange, 'fanout', {durable: true}) && resolve( client ) ) )
//声明队列
.then( (client:any) => new Promise( (resolve,reject) => client.channel.assertQueue( "", {exclusive: true}, (err:any, q:any) => err ? reject(err) : resolve( Object.assign( client, {queue: q.queue} ) ) ) ) )
//绑定队列
.then( (client:any) => new Promise( (resolve,reject) => client.channel.bindQueue(client.queue, client.exchange, '') && resolve( client ) ) )
//消费消息
.then( (client:any) => new Promise( (resolve,reject) => client.channel.consume( client.queue, (msg:any)=> {
    if( msg.content ){
        console.log(" [x] %s:  %s", client.queue, msg.content.toString());
        source.emit( "push", {data: msg.content.toString()} )
    }
}, {noAck: true} ) ) )
.catch( err => process.exit(0) )