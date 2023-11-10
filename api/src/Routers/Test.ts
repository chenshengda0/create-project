#!/usr/bin/env node
import {
    WithRabbitmq,

    ExpressTimerDecorator,
    Middleware,
    WithMysql,
    WithWeb3,
} from "../Common"

const router = require("express").Router();

abstract class ITest{
    abstract index(req:any, res:any):Promise<any>;
}

class Test extends ITest{
    constructor(){ super() }

    @ExpressTimerDecorator()
    async index(req:any, res:any){
        try{
            return {
                code: 200,
                message: "SUCCESS",
                //req: req.body,
                data: [],
            }
        }catch(err:any){
            return {
                code: 400,
                message: err.message,
                data: {}
            }
        }finally{
            console.log( "测试接口" )
        }
    }

}

const middleware = new Middleware();
const test = new Test();
router.post("/", async(req:any,res:any,next:any)=> await middleware.checkAuth(req,res,next), async(req:any,res:any)=>await test.index(req,res) );
export default router;