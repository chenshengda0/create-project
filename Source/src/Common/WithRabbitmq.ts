#!/usr/bin/env node
class WithRabbitmq{

    constructor(){
    }

    async sendSocket(msg: any){
        try{
            const exchange_name = "amq.fanout";
            const amqp = await require("amqplib/callback_api");
            //连接器
            const connection = await new Promise( (resolve,reject)=>amqp.connect({
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
            //创建通道
            const channel = await new Promise( (resolve,reject)=>connection.createChannel( (err:any,channel:any)=> err ? reject(err) : resolve(channel) ) ) as any;
            //发送消息
            channel.publish( exchange_name, "", Buffer.from( JSON.stringify(msg) ) );
            //关闭连接
            await new Promise( (resolve,reject)=>{
                //关闭信道，关闭连接
                setTimeout( ()=>{
                    channel.close( () => {
                        connection.close()
                    } )
                    resolve("关闭连接成功")
                },50 )
            } )
            return true;
        }catch(err:any){
            throw err;
        }finally{
            console.log( "发布消息" )
        }
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
            //发布消息
            for( const m of msg ){
                client.channel.publish( "amq.topic", keyword, Buffer.from( JSON.stringify(m) ) )
            }
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
