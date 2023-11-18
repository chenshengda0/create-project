const router = Router()
abstract class IFileRouter{
    //获取菜单
    abstract get_json(req:any, res:any):Promise<any>;

    //获取图解http
    abstract get_pdf(req:any, res:any):Promise<any>;

    //获取http权威指南
    abstract get_pdfs(req:any, res:any):Promise<any>;
}

class FileRouter extends IFileRouter{

    constructor(){ super() }

    async get_json(req:any, res:any){
        const menuJson = require( `${STATICS}/menu.json` )
        const base = Buffer.from( JSON.stringify( menuJson ) ).toString( "base64" )
        res.setHeader( "Access-Control-Allow-Origin", "*" )
        res.setHeader( "Content-Encoding", "gzip" )
        res.setHeader( "Content-Type", "text/plain" )
        const str = new stream.Transform( {
            async write( chunk:any, encoding:any, next:any ){
                const str = `data:application/json;charset=utf-8;base64,${chunk.toString( "base64" )}`
                this.push( str )
                next();
            }
        } )

        const s = new TransformStream({
            async transform(chunk, controller){
                const str = `data:application/json;charset=utf-8;base64,${chunk.toString( "base64" )}`
                return controller.enqueue( str )
            }
        })
        return stream.Readable.from( Buffer.from( JSON.stringify( menuJson ) ) )
        .pipe( str )
        .pipe( createGzip() )
        .pipe( res );
    }

    async change_stream(req:any, res:any){
        const str = 'hello world';
        const s = stream.Readable.from( Buffer.from( str ) )
        const tUp = new TransformStream( {
            async transform(chunk, controller){
                controller.enqueue( chunk )
            }
        } )
        return s.pipe( tUp ).pipe( res )
    }

    async get_pdf( req:any, res:any ){
        const filePath = `${STATICS}/图解HTTP.pdf`
        const fileStream = fs.createReadStream( filePath )
        const fileState = fs.statSync( filePath )
        res.setHeader( "Content-Length", fileState.size )
        res.setHeader( "Content-Type", "application/pdf" )
        //res.setHeader( "Content-Disposition", "attachment; filename=haha.pdf" )
        return fileStream.pipe( res )
    }

    async get_pdfs( req:any, res:any ){
        const filePath = `${STATICS}/HTTP权威指南.pdf`;
        const fileStream = fs.createReadStream( filePath )
        const fileState = fs.statSync( filePath )
        res.setHeader( "Content-Length", fileState.size )
        res.setHeader( "Content-Type", "application/pdf" )
        //res.setHeader( "Content-Disposition", "attachment; filename=haha.pdf" )
        return fileStream.pipe( res )
    }

    async test(req:any, res:any){
        const tUp = new stream.Transform( {
            async transform(chunk:any, encoding:any, next:any){
                try{
                    throw new Error("hello")
                    this.push( chunk )
                }catch(err:any){
                    this.push( JSON.stringify({
                        code: 500,
                        message: err.message,
                        data: []
                    }) )
                }finally{
                    next();
                }
            }
        } )
        res.setHeader( "Access-Control-Allow-Origin", "*" )
        res.setHeader( "Content-Encoding", "gzip" )
        res.setHeader( "Content-Type", "text/plain;charset=utf-8" )
        return stream.Readable.from( "hello world" )
        .pipe( tUp )
        .pipe( createGzip() )
        .pipe( res )
    }

}

const fileRouter = new FileRouter()

router.get( "/", async(req:any, res:any) => await fileRouter.get_json(req, res) )
router.get( "/get_pdf", async(req:any, res:any) => await fileRouter.get_pdf(req, res) )
router.get( "/get_pdfs", async(req:any, res:any) => await fileRouter.get_pdfs(req, res) )
router.get( "/change_stream", async(req:any, res:any) => await fileRouter.change_stream(req, res) )
router.get( "/test", async(req:any, res:any) => await fileRouter.test(req, res) )
export default router;