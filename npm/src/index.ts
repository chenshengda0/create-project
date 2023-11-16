#!/usr/bin/env node
const app = (require("express"))()
import { HomeRouter } from "./Routers"
app.listen( process.env.LISTEN_PORT, ()=>{
    console.log( "～服务器已启动～" )
} )
app.use( "/", HomeRouter )
process.setMaxListeners(0);
