const http = require( "http" )
const stream = require( "stream" )
const blob = new Blob( ["hello world"], {type: "text/xml"} )

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

console.log( "服务器已启动~" )
