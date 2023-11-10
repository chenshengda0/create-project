const stream = require( "stream" );
const os = require("os");
const ExpressTimerDecorator = (times:number = 0)=>{
    return (
        target: any,
        method:any,
        descriptor:any
    )=>{
        const original = descriptor.value;
        descriptor.value = async function(...args:any[]){
            console.log("======================================================START=====================================================================");
            try{
                const start = new Date().getTime();
                //执行
                const result = await original( ...args );
                const blob = new Blob( [ `${JSON.stringify(result)}${os.EOL}` ], {type: "text/plain"} )
                const end = new Date().getTime();
                //检查键是否存在
                console.log( `执行方法：${method}` )
                console.log( "size:", blob.size );
                console.log( "type:", blob.type );
                console.log( `请求参数:${JSON.stringify(args[0].body)}` )
                console.log( `执行耗时：${end - start} ms` )
                const reader = blob.stream();
                const splitStream = new stream.Transform({
                    write( thunk:any, encoding:any, callback:any ){
                        const cStr = thunk.toString();
                        let currentStr = cStr.slice(0,1024)
                        let lastStr = cStr.slice(1024)
                        while( currentStr.length > 0 ){
                            this.push( currentStr )
                            //console.log( crypted,os.EOL )
                            currentStr = lastStr.slice(0,1024);
                            lastStr = lastStr.slice(1024);
                        }
                        callback();
                    }
                })
                return stream.pipeline(
                    reader,
                    splitStream,
                    args[1],
                    (err:any) => err && console.log( err.message )
                )
            }catch(err:any){
                return args[1].json({
                    code: 400,
                    message: `ERROR: ${err.message}`,
                    data: {}
                })
            }finally{
                console.log("======================================================END=======================================================================");
            }
        }
    }
}

export default ExpressTimerDecorator;