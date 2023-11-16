#!/usr/bin/env node
import {
    WithMysql,
    WithRabbitmq,
    runtimeDecorator,

    adjoint,
    getAxis,
} from "../Common"
const router = require("express").Router()

abstract class IHome{
    
    //默认api
    abstract index(req:any, res:any):Promise<any>;

    //向交换器发送消息
    abstract send_date(req:any, res:any):Promise<any>;

    //爬取页面，返回pdf
    abstract get_pdf(req:any, res:any):Promise<any>;

    //矩阵解二元一次方程组
    abstract get_matrix(req:any, res:any):Promise<any>;

    //测试dataURL
    abstract get_data_url(req:any, res:any):Promise<any>;
}

class Home extends IHome{

    constructor(){ super() }

    @runtimeDecorator()
    async index(req:any, res:any){
        const pool = await WithMysql.getInstance();
        const conn = await new Promise( (resolve, reject) => pool.getConnection( (err:any,connection:any)=> err ? resolve(err.message) : resolve(connection) ) ) as unknown as any;
        try{
            const data = await new Promise( (resolve, reject)=>{
                const sql = `
                    WITH cte AS (
                        SELECT * FROM ss_change_log
                    )
                    SELECT * FROM cte
                `
                conn.query( sql, [], (err:any, dataList:any[])=> err ? reject(err) : resolve( dataList ) )
            } );
            return {
                code: 200,
                message: "SUCCESS",
                data,
            }
        }catch(err:any){
            return {
                code: 400,
                message: err.message,
                data: []
            }
        }finally{
            conn.release()
            console.log( "测试接口" )
        }
    }

    @runtimeDecorator()
    async send_date(req:any, res:any){
        try{
            await WithRabbitmq.sendSocket( new Date() )
            return {
                code: 200,
                message: "SUCCESS",
                data: [],
            }
        }catch(err:any){
            return {
                code: 400,
                message: err.message,
                data: []
            }
        }finally{
            console.log( "发送消息" )
        }
    }

    async get_pdf(req:any, res:any){
        const browser = await require("puppeteer").launch({
            headless: true
        });
        const webPage = await browser.newPage();
        await webPage.goto("http://127.0.0.1:9999/stats", {
            waitUntil: "networkidle0"
        });
        
        const pdf = await webPage.pdf({
            printBackground: true,
            format: "Letter",
            margin: {
                top: "20px",
                bottom: "40px",
                left: "20px",
                right: "20px"
            }
        });
        await browser.close();
        res.setHeader("Content-Type", "application/pdf");
        res.end( pdf )
    }

    async get_matrix(req:any, res:any){
        const matrix = [
            [1, 1, 0],
            [1, -1, 0],
            [0, 0, 1],
        ];
        const bmatrix = adjoint( matrix )
        const m = getAxis( bmatrix, [ [911, 1, 1] ], true )
        const l = m[0].pop() || 1;
        const data = {
            title: `
            f(a) = Math.sqrt(a**2 + 911), f(a)是一个正整数, 求a;
            ∵ a ** 2 + 911 = Y ** 2
            ∴ Y ** 2 - a ** 2 = 911 
            ∴ 911 = ( Y + a ) * ( Y - a )
            ∵ 911 是一个质数
            ∴ a - Y = 1
            ∴ a + Y = 911
            `,
            matrix,
            adjoint: bmatrix,
            product: getAxis( matrix, bmatrix ),
            res: `a: ${m[0][0]/l}, Y: ${m[0][1]/l};`,
        }
        res.setHeader("Content-Type", "text/html;charset=utf-8");
        res.end( JSON.stringify( data ) )
    }

    async get_data_url(req:any, res:any){
        const baseCode = `<script>alert("你好，世界~");</script>`
        const str = `data:text/html;charset=utf8;base64,${Buffer.from( baseCode ).toString("base64")}`
        console.log( str )
        res.setHeader("Content-Type", "text/html;charset=ascii");
        res.end( str )
    }

}

const home = new Home();
router.get( "/", (req:any, res:any) => home.index( req, res ) )
router.get( "/send_date", (req:any, res:any) => home.send_date( req, res ) )
router.get( "/get_pdf", (req:any, res:any) => home.get_pdf( req, res ) )
router.get( "/get_matrix", (req:any, res:any) => home.get_matrix( req, res ) )
router.get( "/get_data_url", (req:any, res:any) => home.get_data_url( req, res ) )

export default router;