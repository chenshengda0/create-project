#!/usr/bin/env node
class WithRabbitmq{

    constructor(){
    }

    static sendSocket(msg: any){
        //引入模块
        return new Promise( (resolve,reject)=> resolve( require("amqplib/callback_api") ) )
        //构建对象
        .then( (amqp)=> {
            return Promise.resolve( Object.assign( {}, {amqp: amqp}) );
        } )
        //创建连接
        .then( async(client:any) => {
            const connection = await new Promise( (resolve,reject)=>client.amqp.connect({
                protocol: process.env.RABBITMQ_PROTOCOL,
                hostname: process.env.RABBITMQ_HOSTNAME,
                port: process.env.RABBITMQ_PORT,
                username: process.env.RABBITMQ_USERNAME,
                password: process.env.RABBITMQ_PASSWORD,
                locale: process.env.RABBITMQ_LOCALE,
                frameMax: process.env.RABBITMQ_FRAMEMAX,
                //heartbeat: 0,
                host: process.env.RABBITMQ_HOST,
            },(err:any,connection:any)=> err ? reject(err) : resolve(connection) ) ) as any;
            return Promise.resolve( Object.assign( client, {connection: connection} ) )
        } )
        //创建信道
        .then( async(client:any) => {
            const channel = await new Promise( (resolve,reject)=>client.connection.createChannel( (err:any,channel:any)=> err ? reject(err) : resolve(channel) ) ) as any;
            return Promise.resolve( Object.assign( client, {channel: channel} ) )
        } )
        //声明交换器名称
        .then( (client:any) => new Promise( (resolve,reject) => resolve( Object.assign( client, {exchange: process.env.EXCHANGE_NAME} ) ) ) )
        //声明交换器
        .then( (client:any) => new Promise( (resolve, reject) => client.channel.assertExchange(client.exchange, 'fanout', {durable: true}) && resolve( client ) ) )
        //发布消息
        .then( (client:any) => {
            //console.log( "client: ", client )
            client.channel.publish( process.env.EXCHANGE_NAME, "", Buffer.from( JSON.stringify(msg) ) )
            //console.log( "client: ", client )
            return Promise.resolve( client )
        }  )
        //关闭连接
        .then( (client:any) => client.channel.close( ()=>client.connection.close() ) )
        //打印信息
        .finally( ()=> console.log( `发布消息到${process.env.EXCHANGE_NAME}` ) )
    }

    static consumer(keyword:string){
        //引入模块
        return new Promise( (resolve,reject)=> resolve( require("amqplib/callback_api") ) )
        //构建对象
        .then( (amqp)=> {
            return Promise.resolve( Object.assign( {}, {amqp: amqp}) );
        } )
        //创建连接
        .then( async(client:any) => {
            const connection = await new Promise( (resolve,reject)=>client.amqp.connect({
                protocol: process.env.RABBITMQ_PROTOCOL,
                hostname: process.env.RABBITMQ_HOSTNAME,
                port: process.env.RABBITMQ_PORT,
                username: process.env.RABBITMQ_USERNAME,
                password: process.env.RABBITMQ_PASSWORD,
                locale: process.env.RABBITMQ_LOCALE,
                frameMax: process.env.RABBITMQ_FRAMEMAX,
                //heartbeat: 0,
                host: process.env.RABBITMQ_HOST,
            },(err:any,connection:any)=> err ? reject(err) : resolve(connection) ) ) as any;
            return Promise.resolve( Object.assign( client, {connection: connection} ) )
        } )
        //创建信道
        .then( async(client:any) => {
            const channel = await new Promise( (resolve,reject)=>client.connection.createChannel( (err:any,channel:any)=> err ? reject(err) : resolve(channel) ) ) as any;
            return Promise.resolve( Object.assign( client, {channel: channel} ) )
        } )
        //创建队列
        .then( async(client:any) => {
            //创建队列
            await client.channel.assertQueue(`${keyword}_queue`,{
                durable: true,      //持久化
                autoDelete: false,  //自动删除
                exclusive: false,   //排它
            })
            return Object.assign( {}, client );
        } )
        //绑定队列
        .then( async(client:any)=>{
            await client.channel.bindQueue( `${keyword}_queue`, "amq.topic", keyword );
            return client;
        } )
        //消费消息，写入blob
        .then( async(client:any)=>{
            const message = await (new Proxy( async function*(){
                for( let i = 0; i < 24; ++i ){
                    const  message = await new Promise( (resolve,reject)=>{
                        client.channel.get( `${keyword}_queue`, {noAck:true}, (err:any,message:any)=> err ? reject(err) : resolve( message ) );
                    } ) as any;
                    if( message ){
                        yield JSON.parse( message.content.toString() );
                    }else{
                        break;
                    }
                }
            }, {
                apply: async function(...args){
                    console.time( "consumer" )
                    const GEN = Reflect.apply( ...args );
                    const ANS = []
                    for await(const g of GEN){
                        ANS.push( g )
                    }
                    console.timeEnd( "consumer" )
                    return ANS;
                }
            } ))() as unknown as any[] || [];
            return Object.assign( {}, client, {message: message} )
        } )
        //关闭连接
        .then( async(client:any) => {
            client.channel.close( ()=>client.connection.close() )
            return new Blob( [ JSON.stringify( client.message ) ], {type: "text/xml"} )
        } )
        //打印信息
        .finally( ()=> console.log( `消费${keyword}_queue队列消息～` ) )
    }

    //发布消息
    static publish(keyword:string,msg:any[]){
        //引入模块
        return new Promise( (resolve,reject)=> resolve( require("amqplib/callback_api") ) )
        //构建对象
        .then( (amqp)=> {
            return Promise.resolve( Object.assign( {}, {amqp: amqp}) );
        } )
        //创建连接
        .then( async(client:any) => {
            const connection = await new Promise( (resolve,reject)=>client.amqp.connect({
                protocol: process.env.RABBITMQ_PROTOCOL,
                hostname: process.env.RABBITMQ_HOSTNAME,
                port: process.env.RABBITMQ_PORT,
                username: process.env.RABBITMQ_USERNAME,
                password: process.env.RABBITMQ_PASSWORD,
                locale: process.env.RABBITMQ_LOCALE,
                frameMax: process.env.RABBITMQ_FRAMEMAX,
                //heartbeat: 0,
                host: process.env.RABBITMQ_HOST,
            },(err:any,connection:any)=> err ? reject(err) : resolve(connection) ) ) as any;
            return Promise.resolve( Object.assign( client, {connection: connection} ) )
        } )
        //创建信道
        .then( async(client:any) => {
            const channel = await new Promise( (resolve,reject)=>client.connection.createChannel( (err:any,channel:any)=> err ? reject(err) : resolve(channel) ) ) as any;
            return Promise.resolve( Object.assign( client, {channel: channel} ) )
        } )
        //发布消息
        .then( (client:any) => {
            //console.log( "client: ", client )
            client.channel.publish( "amq.topic", keyword, Buffer.from( JSON.stringify(msg) ) )
            //console.log( "client: ", client )
            return Promise.resolve( client )
        }  )
        //关闭连接
        .then( (client:any) => client.channel.close( ()=>client.connection.close() ) )
        //打印信息
        .finally( ()=> console.log( `发布消息到${keyword}_queue` ) )
    }

}

export default WithRabbitmq;