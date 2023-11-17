import {
    FileRouter
} from "./Routers"
const app = require( "express" )()
app.listen( process.env.LISTEN_PORT, ()=>{
    console.log( `服务器已启动,端口: ${process.env.LISTEN_PORT}～` )
} )

app.use( "/",  FileRouter)