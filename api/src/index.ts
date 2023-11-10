#!/usr/bin/env node
import {
    TestRouter,
} from "./Routers"
import {createServer} from "http"
const app = (require("express"))();
const bodyParser = require("body-parser");

/*引入cors*/
const cors = require('cors');
app.use(cors());
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({extended: true}) );//application/x-www-form-urlencoded
app.get('/', (req:any, res:any) => {
    return res.json({
        code: 200,
        message: "home page",
        data: {}
    })
})

app.use("/test", TestRouter);
const httpServer = createServer( app )

httpServer.listen( process.env.LISTEN_PORT, ()=>{
    console.log( "服务器已启动" )
} )

//捕获到异常不退出
process.on( "uncaughtException",(err)=>{
    console.log( err.stack )
    console.log( "NOT exit..." )
    //process.exit(0);
} )

process.setMaxListeners(0);