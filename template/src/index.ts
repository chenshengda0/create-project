import {
    FileRouter
} from "Routers"

const app = express()
app.listen( LISTEN_PORT, ()=>{
    console.log( "服务器已启动,端口: %d～", LISTEN_PORT )
} )

app.use( "/",  FileRouter)

//捕获到异常不退出
process.on( "uncaughtException",(err)=>{
    console.log( err.stack )
    console.log( "NOT exit..." )
    //process.exit(0);
} )

process.setMaxListeners(0);