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
        const baseCode = 'var e={d:(n,t)=>{for(var r in t)e.o(t,r)&&!e.o(n,r)&&Object.defineProperty(n,r,{enumerable:!0,get:t[r]})},o:(e,n)=>Object.prototype.hasOwnProperty.call(e,n)},n={};e.d(n,{T:()=>r,uj:()=>f,GH:()=>c,dd:()=>o,sZ:()=>t,wh:()=>l,hD:()=>h,C2:()=>a,X_:()=>s,vI:()=>i});const t=function(e,n=!1){const t=Math.min(...e),r=Math.max(...e),o=Math.random()*(r-t)+t;return n?Math.round(o):o},r=function(e){const n=e.length,t=e[0].length,r=Array.from({length:t},(()=>Array.from({length:n},(()=>0))));for(let n=0;n<e.length;++n)for(let t=0;t<e[n].length;++t)r[t][n]=e[n][t];return r},o=function(e,n=[[0],[0],[0],[1]],t=!1){const o=t?n:r(n);if(e[0].length!==o[0].length)throw new Error("矩阵长度不匹配");return new Proxy((function*(){for(let n=0;n<o.length;++n){const t=[];for(let r=0;r<e.length;++r)t.push(function(e,n){return e.reduce(((t,r,o)=>t+e[o]*n[o]),0)}(e[r],o[n]));yield t}}),{apply(...e){const n=Reflect.apply(...e);return t?[...n]:r([...n])}})()},l=function(e){if(4!==e.length||4!==e[0].length)throw new Error("请输入4*4矩阵");return new Proxy((function*(){yield e[0][0],yield e[1][0],yield e[0][1],yield e[1][1],yield e[0][3],yield e[1][3]}),{apply:(...e)=>[...Reflect.apply(...e)]})()},h=function(e){if(4!==e.length||4!==e[0].length)throw new Error("请输入4*4矩阵");const n=r(e);return new Proxy((function*(){for(let e=0;e<n.length;++e)for(let t=0;t<n[e].length;++t)yield n[e][t]}),{apply:(...e)=>[...Reflect.apply(...e)]})()},a=function(e){if(4!==e.length||4!==e[0].length)throw new Error("请输入4*4矩阵");const n=r(e);return new Proxy((function*(){for(let e=0;e<n.length;++e)for(let t=0;t<n[e].length;++t)yield n[e][t]}),{apply:(...e)=>`matrix3d(${[...Reflect.apply(...e)].join(",")})`})()},c=function(e){if(e.length!==e[0].length||e.length<=0)throw new Error("请输入n*n矩阵");const n=e.length;switch(!0){case n<=0:throw new Error("请输入n*n方阵");case 1===n:return e[0][0];case 2===n:return e[0][0]*e[1][1]-e[1][0]*e[0][1];default:let t=0;const r=[...e[0]];for(let o=0;o<r.length;++o)t+=new Proxy((function*(t){for(let r=1;r<n;++r){const o=[];for(let l=0;l<n;++l)l!==t&&o.push(e[r][l]);yield o}}),{apply:(...e)=>{const n=[...Reflect.apply(...e)];return c(n)}})(o)*r[o]*(-1)**o;return t}},f=function(e,n=!1){let t,o=0;if(n){if(e.length!==e[0].length&&e.length<1)throw new Error("请输入n*n矩阵");t=new Proxy((function(){const n=Array.from({length:e.length+1},(()=>Array.from({length:e.length+1},(()=>0))));for(let t=0;t<e.length;++t)for(let r=0;r<e.length;++r)n[t][r]=e[t][r];return n[e.length][e.length]=1,n}),{apply:(...e)=>Reflect.apply(...e)})(),o=t.length}else{if(e.length!==e[0].length&&e.length<2)throw new Error("请输入n*n矩阵");t=e,o=t.length}if(!0==(2===o)){const e=Array.from({length:o},(()=>Array.from({length:o},(()=>0))));return e[0][0]=t[1][1],e[0][1]=-t[0][1],e[1][0]=-t[1][0],e[1][1]=t[0][0],e}{const e=Array.from({length:o},(()=>Array.from({length:o},(()=>0))));for(let n=0;n<o;++n)for(let l=0;l<o;++l)e[n][l]=new Proxy((function(e,n){const l=[];for(let n=0;n<o;++n)n!==e&&l.push([...t[n]]);const h=r(l),a=[];for(let e=0;e<o;++e)e!==n&&a.push([...h[e]]);const f=r(a);return(-1)**(e+n)*c(f)}),{apply:(...e)=>Reflect.apply(...e)})(n,l);return r(e)}};function s(e,n,t,o){const l=1/Math.tan(e/2),h=Array.from({length:16},(()=>0));if(h[0]=l/n,h[1]=0,h[2]=0,h[3]=0,h[4]=0,h[5]=l,h[6]=0,h[7]=0,h[8]=0,h[9]=0,h[11]=-1,h[12]=0,h[13]=0,h[15]=0,null!=o&&o!==1/0){const e=1/(t-o);h[10]=(o+t)*e,h[14]=2*o*t*e}else h[10]=-1,h[14]=-2*t;return new Proxy((function*(){for(h.reverse();h.length>0;){const e=[];for(let n=0;n<4;++n)e.push(h.pop());yield e}}),{apply(...e){const n=[...Reflect.apply(...e)];return r(n)}})()}const i=function(){return(e,n,t)=>{t.value=new Proxy(t.value,{apply:function(...e){console.log(`============================================================START: ${n} ============================================================`);try{return console.log("email: ","chen_shengda@yeah.net"),console.log("time: ",new Date),console.log("args: ",e),Reflect.apply(...e)}catch(e){console.error(e)}finally{console.log(`==============================================================END: ${n} ============================================================`)}}})}};var g=n.T,u=n.uj,y=n.GH,p=n.dd,w=n.sZ,d=n.wh,m=n.hD,x=n.C2,A=n.X_,P=n.vI;export{g as T,u as adjoint,y as determinant,p as getAxis,w as getRandom,d as matrix2D,m as matrix3D,x as matrixCss,A as perspectiveNO,P as runtimeDecorator};';
        const str = `data:text/javascript;charset=utf-8;base64,${Buffer.from( baseCode ).toString("base64")}`
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