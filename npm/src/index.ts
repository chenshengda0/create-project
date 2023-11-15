const http = require( "http" )
const stream = require( "stream" )
const blob = new Blob( ["hello world"], {type: "text/xml"} )
import {
    adjoint,
    getAxis,
} from "./Common"
console.log( `
    f(a) = Math.sqrt(a**2 + 911), f(a)是一个正整数, 求a;
    ∵ a ** 2 + 911 = Y ** 2
    ∴ Y ** 2 - a ** 2 = 911 
    ∴ 911 = ( Y + a ) * ( Y - a )
    ∵ 911 是一个质数
    ∴ a - Y = 1
    ∴ a + Y = 911
` )

console.time( "for" )
for( let i = 1; i < 911; ++i ){
    if( i + ( i + 1 ) === 911  ){
        console.log( i, i+1 )
    }
}
console.timeEnd( "for" )

const matrix = [
    [1, 1, 0],
    [1, -1, 0],
    [0, 0, 1],
];
const bmatrix = adjoint( matrix )
console.time( "matrix" )
const m = getAxis( bmatrix, [ [911, 1, 1] ], true )
const l = m[0].pop();
console.log( "矩阵: ", matrix )
console.log( "伴随矩阵: ", bmatrix )
console.log( "矩阵乘积: ", getAxis( matrix, bmatrix ) )
console.log( "a: %d, Y: %d;", m[0][0]/l, m[0][1]/l )

console.timeEnd( "matrix" )

/*
const server = http.createServer( async(req:any, res:any)=>{
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

    //console.log( pdf )

    await browser.close();
    res.setHeader("Content-Type", "application/pdf");
    res.end( pdf )
    //res.setHeader("Content-Type", "application/pdf");
    //stream.pipeline( new Blob( [ pdf ], {type: "application/pdf"} ), res, (err:any) => err && res.end("ERROR") )
    //return ;
} ).listen( 9527 )
*/

//console.log( "服务器已启动~" )
