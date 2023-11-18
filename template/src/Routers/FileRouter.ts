

const menudata = require('data:application/json;charset=utf-8;base64,W3siaWQiOjEwMTAwMDAwMDAsInBpZCI6MCwia2V5IjoiLyIsInRpdGxlIjoi57O757uf566A5LuLIiwiY29tcG9uZW50IjoiSG9tZVBhZ2UiLCJpY29uIjoiRGVza3RvcE91dGxpbmVkIiwiaXNfbWVudSI6dHJ1ZSwiaXNfcm91dGUiOnRydWUsInBhdGgiOlsxMDEwMDAwMDAwXSwidGl0bGVzIjpbIuezu+e7n+eugOS7iyJdfSx7ImlkIjoxMDIwMDAwMDAwLCJwaWQiOjAsImtleSI6Ii9hZG1pbl9tYW5hZ2VyIiwidGl0bGUiOiLnrqHnkIblkZjnrqHnkIYiLCJjb21wb25lbnQiOiJBZG1pbiIsImljb24iOiJEZXNrdG9wT3V0bGluZWQiLCJpc19tZW51Ijp0cnVlLCJpc19yb3V0ZSI6ZmFsc2UsInBhdGgiOlsxMDIwMDAwMDAwXSwidGl0bGVzIjpbIueuoeeQhuWRmOeuoeeQhiJdfSx7ImlkIjoxMDIwMTAwMDAwLCJwaWQiOjEwMjAwMDAwMDAsImtleSI6Ii9hZG1pbl9tYW5hZ2VyL2xpc3QiLCJ0aXRsZSI6IueuoeeQhuWRmOWIl+ihqCIsImNvbXBvbmVudCI6IkFkbWluTGlzdFBhZ2UiLCJpY29uIjoiRGVza3RvcE91dGxpbmVkIiwiaXNfbWVudSI6dHJ1ZSwiaXNfcm91dGUiOnRydWUsInBhdGgiOlsxMDIwMDAwMDAwLDEwMjAxMDAwMDBdLCJ0aXRsZXMiOlsi566h55CG5ZGY566h55CGIiwi566h55CG5ZGY5YiX6KGoIl19LHsiaWQiOjEwMzAwMDAwMDAsInBpZCI6MCwia2V5IjoiL3ByaWNlcyIsInRpdGxlIjoiSUNQ566h55CGIiwiY29tcG9uZW50IjoiUGlyY2UiLCJpY29uIjoiRGVza3RvcE91dGxpbmVkIiwiaXNfbWVudSI6dHJ1ZSwiaXNfcm91dGUiOmZhbHNlLCJwYXRoIjpbMTAzMDAwMDAwMF0sInRpdGxlcyI6WyJJQ1DnrqHnkIYiXX0seyJpZCI6MTAzMDEwMDAwMCwicGlkIjoxMDMwMDAwMDAwLCJrZXkiOiIvcHJpY2VzL3ByaWNlX2xpc3QiLCJ0aXRsZSI6IuS7t+agvOeuoeeQhiIsImNvbXBvbmVudCI6IlByaWNlTGlzdFBhZ2UiLCJpY29uIjoiRGVza3RvcE91dGxpbmVkIiwiaXNfbWVudSI6dHJ1ZSwiaXNfcm91dGUiOnRydWUsInBhdGgiOlsxMDMwMDAwMDAwLDEwMzAxMDAwMDBdLCJ0aXRsZXMiOlsiSUNQ566h55CGIiwi5Lu35qC8566h55CGIl19LHsiaWQiOjEwMzAyMDAwMDAsInBpZCI6MTAzMDAwMDAwMCwia2V5IjoiL3ByaWNlcy9jb2luX3N3YXAiLCJ0aXRsZSI6IuWFkeaNoueuoeeQhiIsImNvbXBvbmVudCI6IlN3YXBTdGF0dXNQYWdlIiwiaWNvbiI6IkRlc2t0b3BPdXRsaW5lZCIsImlzX21lbnUiOnRydWUsImlzX3JvdXRlIjp0cnVlLCJwYXRoIjpbMTAzMDAwMDAwMCwxMDMwMjAwMDAwXSwidGl0bGVzIjpbIklDUOeuoeeQhiIsIuWFkeaNoueuoeeQhiJdfSx7ImlkIjoxMDQwMDAwMDAwLCJwaWQiOjAsImtleSI6Ii9yZWNoYXJnZSIsInRpdGxlIjoi5YWF5YC86K6+572uIiwiY29tcG9uZW50IjoiSG9tZVBhZ2UiLCJpY29uIjoiRGVza3RvcE91dGxpbmVkIiwiaXNfbWVudSI6dHJ1ZSwiaXNfcm91dGUiOmZhbHNlLCJwYXRoIjpbMTA0MDAwMDAwMF0sInRpdGxlcyI6WyLlhYXlgLzorr7nva4iXX0seyJpZCI6MTA0MDEwMDAwMCwicGlkIjoxMDQwMDAwMDAwLCJrZXkiOiIvcmVjaGFyZ2Uvc2V0X3JlY2hhcmdlIiwidGl0bGUiOiLpkrHljIXorr7nva4iLCJjb21wb25lbnQiOiJTZXRSZWNoYXJnZUNvaW5QYWdlIiwiaWNvbiI6IkRlc2t0b3BPdXRsaW5lZCIsImlzX21lbnUiOnRydWUsImlzX3JvdXRlIjp0cnVlLCJwYXRoIjpbMTA0MDAwMDAwMCwxMDQwMTAwMDAwXSwidGl0bGVzIjpbIuWFheWAvOiuvue9riIsIumSseWMheiuvue9riJdfSx7ImlkIjoxMDUwMDAwMDAwLCJwaWQiOjAsImtleSI6Ii9wbGFjYXJkIiwidGl0bGUiOiLlhazlkYrnrqHnkIYiLCJjb21wb25lbnQiOiJQbGFjYXJkIiwiaWNvbiI6IkRlc2t0b3BPdXRsaW5lZCIsImlzX21lbnUiOnRydWUsImlzX3JvdXRlIjpmYWxzZSwicGF0aCI6WzEwNTAwMDAwMDBdLCJ0aXRsZXMiOlsi5YWs5ZGK566h55CGIl19LHsiaWQiOjEwNTAxMDAwMDAsInBpZCI6MTA1MDAwMDAwMCwia2V5IjoiL3BsYWNhcmQvY3JlYXRlX3BsYWNhcmQiLCJ0aXRsZSI6Iua3u+WKoOWFrOWRiiIsImNvbXBvbmVudCI6IkNyZWF0ZVBsYWNhcmRQYWdlIiwiaWNvbiI6IkRlc2t0b3BPdXRsaW5lZCIsImlzX21lbnUiOnRydWUsImlzX3JvdXRlIjp0cnVlLCJwYXRoIjpbMTA1MDAwMDAwMCwxMDUwMTAwMDAwXSwidGl0bGVzIjpbIuWFrOWRiueuoeeQhiIsIua3u+WKoOWFrOWRiiJdfSx7ImlkIjoxMDUwMjAwMDAwLCJwaWQiOjEwNTAwMDAwMDAsImtleSI6Ii9wbGFjYXJkL3BsYWNhcmRfbGlzdCIsInRpdGxlIjoi5YWs5ZGK5YiX6KGoIiwiY29tcG9uZW50IjoiUGxhY2FyZExpc3RQYWdlIiwiaWNvbiI6IkRlc2t0b3BPdXRsaW5lZCIsImlzX21lbnUiOnRydWUsImlzX3JvdXRlIjp0cnVlLCJwYXRoIjpbMTA1MDAwMDAwMCwxMDUwMjAwMDAwXSwidGl0bGVzIjpbIuWFrOWRiueuoeeQhiIsIuWFrOWRiuWIl+ihqCJdfSx7ImlkIjoxMDYwMDAwMDAwLCJwaWQiOjAsImtleSI6Ii91c2VycyIsInRpdGxlIjoi5biQ5oi3566h55CGIiwiY29tcG9uZW50IjoiVXNlciIsImljb24iOiJEZXNrdG9wT3V0bGluZWQiLCJpc19tZW51Ijp0cnVlLCJpc19yb3V0ZSI6ZmFsc2UsInBhdGgiOlsxMDYwMDAwMDAwXSwidGl0bGVzIjpbIuW4kOaIt+euoeeQhiJdfSx7ImlkIjoxMDYwMTAwMDAwLCJwaWQiOjEwNjAwMDAwMDAsImtleSI6Ii91c2Vycy91c2VyX2xpc3QiLCJ0aXRsZSI6IuW4kOaIt+WIl+ihqCIsImNvbXBvbmVudCI6IlVzZXJzTGlzdFBhZ2UiLCJpY29uIjoiRGVza3RvcE91dGxpbmVkIiwiaXNfbWVudSI6dHJ1ZSwiaXNfcm91dGUiOnRydWUsInBhdGgiOlsxMDYwMDAwMDAwLDEwNjAxMDAwMDBdLCJ0aXRsZXMiOlsi5biQ5oi3566h55CGIiwi5biQ5oi35YiX6KGoIl19LHsiaWQiOjEwNzAwMDAwMDAsInBpZCI6MCwia2V5IjoiL3VzZXJfcmVjaGFyZ2UiLCJ0aXRsZSI6IuWFheWAvOeuoeeQhiIsImNvbXBvbmVudCI6IlVzZXJSZWNoYXJnZSIsImljb24iOiJEZXNrdG9wT3V0bGluZWQiLCJpc19tZW51Ijp0cnVlLCJpc19yb3V0ZSI6ZmFsc2UsInBhdGgiOlsxMDcwMDAwMDAwXSwidGl0bGVzIjpbIuWFheWAvOeuoeeQhiJdfSx7ImlkIjoxMDcwMTAwMDAwLCJwaWQiOjEwNzAwMDAwMDAsImtleSI6Ii91c2VyX3JlY2hhcmdlL3JlY2hhcmdlX2xpc3QiLCJ0aXRsZSI6IuWFheWAvOWIl+ihqCIsImNvbXBvbmVudCI6IlVzZXJSZWNoYXJnZUxpc3RQYWdlIiwiaWNvbiI6IkRlc2t0b3BPdXRsaW5lZCIsImlzX21lbnUiOnRydWUsImlzX3JvdXRlIjp0cnVlLCJwYXRoIjpbMTA3MDAwMDAwMCwxMDcwMTAwMDAwXSwidGl0bGVzIjpbIuWFheWAvOeuoeeQhiIsIuWFheWAvOWIl+ihqCJdfSx7ImlkIjoxMDgwMDAwMDAwLCJwaWQiOjAsImtleSI6Ii91c2VyX3dpdGhkcmF3IiwidGl0bGUiOiLmj5DnjrDnrqHnkIYiLCJjb21wb25lbnQiOiJVc2VyV2l0aGRyYXciLCJpY29uIjoiRGVza3RvcE91dGxpbmVkIiwiaXNfbWVudSI6dHJ1ZSwiaXNfcm91dGUiOmZhbHNlLCJwYXRoIjpbMTA4MDAwMDAwMF0sInRpdGxlcyI6WyLmj5DnjrDnrqHnkIYiXX0seyJpZCI6MTA4MDEwMDAwMCwicGlkIjoxMDgwMDAwMDAwLCJrZXkiOiIvdXNlcl93aXRoZHJhdy93aXRoZHJhd19saXN0IiwidGl0bGUiOiLmj5DnjrDliJfooagiLCJjb21wb25lbnQiOiJVc2VyV2l0aGRyYXdMaXN0UGFnZSIsImljb24iOiJEZXNrdG9wT3V0bGluZWQiLCJpc19tZW51Ijp0cnVlLCJpc19yb3V0ZSI6dHJ1ZSwicGF0aCI6WzEwODAwMDAwMDAsMTA4MDEwMDAwMF0sInRpdGxlcyI6WyLmj5DnjrDnrqHnkIYiLCLmj5DnjrDliJfooagiXX0seyJpZCI6MTA5MDAwMDAwMCwicGlkIjowLCJrZXkiOiIvdXNlcl9zd2FwIiwidGl0bGUiOiLlhZHmjaLnrqHnkIYiLCJjb21wb25lbnQiOiJVc2VyU3dhcCIsImljb24iOiJEZXNrdG9wT3V0bGluZWQiLCJpc19tZW51Ijp0cnVlLCJpc19yb3V0ZSI6ZmFsc2UsInBhdGgiOlsxMDkwMDAwMDAwXSwidGl0bGVzIjpbIuWFkeaNoueuoeeQhiJdfSx7ImlkIjoxMDkwMTAwMDAwLCJwaWQiOjEwOTAwMDAwMDAsImtleSI6Ii91c2VyX3N3YXAvc3dhcF9saXN0IiwidGl0bGUiOiLlhZHmjaLliJfooagiLCJjb21wb25lbnQiOiJVc2VyU3dhcExpc3RQYWdlIiwiaWNvbiI6IkRlc2t0b3BPdXRsaW5lZCIsImlzX21lbnUiOnRydWUsImlzX3JvdXRlIjp0cnVlLCJwYXRoIjpbMTA5MDAwMDAwMCwxMDkwMTAwMDAwXSwidGl0bGVzIjpbIuWFkeaNoueuoeeQhiIsIuWFkeaNouWIl+ihqCJdfSx7ImlkIjoxMTAwMDAwMDAwLCJwaWQiOjAsImtleSI6Ii9jaGFuZ2VfbG9nIiwidGl0bGUiOiLml6Xlv5fnrqHnkIYiLCJjb21wb25lbnQiOiJDaGFuZ2VMb2ciLCJpY29uIjoiRGVza3RvcE91dGxpbmVkIiwiaXNfbWVudSI6dHJ1ZSwiaXNfcm91dGUiOmZhbHNlLCJwYXRoIjpbMTEwMDAwMDAwMF0sInRpdGxlcyI6WyLml6Xlv5fnrqHnkIYiXX0seyJpZCI6MTEwMDEwMDAwMCwicGlkIjoxMTAwMDAwMDAwLCJrZXkiOiIvY2hhbmdlX2xvZy9jaGFuZ2VfbG9nX2xpc3QiLCJ0aXRsZSI6IuaXpeW/l+WIl+ihqCIsImNvbXBvbmVudCI6IkNoYW5nZUxvZ1BhZ2UiLCJpY29uIjoiRGVza3RvcE91dGxpbmVkIiwiaXNfbWVudSI6dHJ1ZSwiaXNfcm91dGUiOnRydWUsInBhdGgiOlsxMTAwMDAwMDAwLDExMDAxMDAwMDBdLCJ0aXRsZXMiOlsi5pel5b+X566h55CGIiwi5pel5b+X5YiX6KGoIl19XQ==');
const router = require( "express" ).Router()
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
        const menuJson = require( "./static/menu.json" )
        const stream = require( "stream" )
        const base = Buffer.from( JSON.stringify( menuJson ) ).toString( "base64" )
        const zlib = require( "zlib" )
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
        .pipe( zlib.createGzip() )
        .pipe( res );
    }

    async change_stream(req:any, res:any){
        const stream = require( "stream" )
        const str = 'data:application/json;charset=utf-8;base64,W3siaWQiOjEwMTAwMDAwMDAsInBpZCI6MCwia2V5IjoiLyIsInRpdGxlIjoi57O757uf566A5LuLIiwiY29tcG9uZW50IjoiSG9tZVBhZ2UiLCJpY29uIjoiRGVza3RvcE91dGxpbmVkIiwiaXNfbWVudSI6dHJ1ZSwiaXNfcm91dGUiOnRydWUsInBhdGgiOlsxMDEwMDAwMDAwXSwidGl0bGVzIjpbIuezu+e7n+eugOS7iyJdfSx7ImlkIjoxMDIwMDAwMDAwLCJwaWQiOjAsImtleSI6Ii9hZG1pbl9tYW5hZ2VyIiwidGl0bGUiOiLnrqHnkIblkZjnrqHnkIYiLCJjb21wb25lbnQiOiJBZG1pbiIsImljb24iOiJEZXNrdG9wT3V0bGluZWQiLCJpc19tZW51Ijp0cnVlLCJpc19yb3V0ZSI6ZmFsc2UsInBhdGgiOlsxMDIwMDAwMDAwXSwidGl0bGVzIjpbIueuoeeQhuWRmOeuoeeQhiJdfSx7ImlkIjoxMDIwMTAwMDAwLCJwaWQiOjEwMjAwMDAwMDAsImtleSI6Ii9hZG1pbl9tYW5hZ2VyL2xpc3QiLCJ0aXRsZSI6IueuoeeQhuWRmOWIl+ihqCIsImNvbXBvbmVudCI6IkFkbWluTGlzdFBhZ2UiLCJpY29uIjoiRGVza3RvcE91dGxpbmVkIiwiaXNfbWVudSI6dHJ1ZSwiaXNfcm91dGUiOnRydWUsInBhdGgiOlsxMDIwMDAwMDAwLDEwMjAxMDAwMDBdLCJ0aXRsZXMiOlsi566h55CG5ZGY566h55CGIiwi566h55CG5ZGY5YiX6KGoIl19LHsiaWQiOjEwMzAwMDAwMDAsInBpZCI6MCwia2V5IjoiL3ByaWNlcyIsInRpdGxlIjoiSUNQ566h55CGIiwiY29tcG9uZW50IjoiUGlyY2UiLCJpY29uIjoiRGVza3RvcE91dGxpbmVkIiwiaXNfbWVudSI6dHJ1ZSwiaXNfcm91dGUiOmZhbHNlLCJwYXRoIjpbMTAzMDAwMDAwMF0sInRpdGxlcyI6WyJJQ1DnrqHnkIYiXX0seyJpZCI6MTAzMDEwMDAwMCwicGlkIjoxMDMwMDAwMDAwLCJrZXkiOiIvcHJpY2VzL3ByaWNlX2xpc3QiLCJ0aXRsZSI6IuS7t+agvOeuoeeQhiIsImNvbXBvbmVudCI6IlByaWNlTGlzdFBhZ2UiLCJpY29uIjoiRGVza3RvcE91dGxpbmVkIiwiaXNfbWVudSI6dHJ1ZSwiaXNfcm91dGUiOnRydWUsInBhdGgiOlsxMDMwMDAwMDAwLDEwMzAxMDAwMDBdLCJ0aXRsZXMiOlsiSUNQ566h55CGIiwi5Lu35qC8566h55CGIl19LHsiaWQiOjEwMzAyMDAwMDAsInBpZCI6MTAzMDAwMDAwMCwia2V5IjoiL3ByaWNlcy9jb2luX3N3YXAiLCJ0aXRsZSI6IuWFkeaNoueuoeeQhiIsImNvbXBvbmVudCI6IlN3YXBTdGF0dXNQYWdlIiwiaWNvbiI6IkRlc2t0b3BPdXRsaW5lZCIsImlzX21lbnUiOnRydWUsImlzX3JvdXRlIjp0cnVlLCJwYXRoIjpbMTAzMDAwMDAwMCwxMDMwMjAwMDAwXSwidGl0bGVzIjpbIklDUOeuoeeQhiIsIuWFkeaNoueuoeeQhiJdfSx7ImlkIjoxMDQwMDAwMDAwLCJwaWQiOjAsImtleSI6Ii9yZWNoYXJnZSIsInRpdGxlIjoi5YWF5YC86K6+572uIiwiY29tcG9uZW50IjoiSG9tZVBhZ2UiLCJpY29uIjoiRGVza3RvcE91dGxpbmVkIiwiaXNfbWVudSI6dHJ1ZSwiaXNfcm91dGUiOmZhbHNlLCJwYXRoIjpbMTA0MDAwMDAwMF0sInRpdGxlcyI6WyLlhYXlgLzorr7nva4iXX0seyJpZCI6MTA0MDEwMDAwMCwicGlkIjoxMDQwMDAwMDAwLCJrZXkiOiIvcmVjaGFyZ2Uvc2V0X3JlY2hhcmdlIiwidGl0bGUiOiLpkrHljIXorr7nva4iLCJjb21wb25lbnQiOiJTZXRSZWNoYXJnZUNvaW5QYWdlIiwiaWNvbiI6IkRlc2t0b3BPdXRsaW5lZCIsImlzX21lbnUiOnRydWUsImlzX3JvdXRlIjp0cnVlLCJwYXRoIjpbMTA0MDAwMDAwMCwxMDQwMTAwMDAwXSwidGl0bGVzIjpbIuWFheWAvOiuvue9riIsIumSseWMheiuvue9riJdfSx7ImlkIjoxMDUwMDAwMDAwLCJwaWQiOjAsImtleSI6Ii9wbGFjYXJkIiwidGl0bGUiOiLlhazlkYrnrqHnkIYiLCJjb21wb25lbnQiOiJQbGFjYXJkIiwiaWNvbiI6IkRlc2t0b3BPdXRsaW5lZCIsImlzX21lbnUiOnRydWUsImlzX3JvdXRlIjpmYWxzZSwicGF0aCI6WzEwNTAwMDAwMDBdLCJ0aXRsZXMiOlsi5YWs5ZGK566h55CGIl19LHsiaWQiOjEwNTAxMDAwMDAsInBpZCI6MTA1MDAwMDAwMCwia2V5IjoiL3BsYWNhcmQvY3JlYXRlX3BsYWNhcmQiLCJ0aXRsZSI6Iua3u+WKoOWFrOWRiiIsImNvbXBvbmVudCI6IkNyZWF0ZVBsYWNhcmRQYWdlIiwiaWNvbiI6IkRlc2t0b3BPdXRsaW5lZCIsImlzX21lbnUiOnRydWUsImlzX3JvdXRlIjp0cnVlLCJwYXRoIjpbMTA1MDAwMDAwMCwxMDUwMTAwMDAwXSwidGl0bGVzIjpbIuWFrOWRiueuoeeQhiIsIua3u+WKoOWFrOWRiiJdfSx7ImlkIjoxMDUwMjAwMDAwLCJwaWQiOjEwNTAwMDAwMDAsImtleSI6Ii9wbGFjYXJkL3BsYWNhcmRfbGlzdCIsInRpdGxlIjoi5YWs5ZGK5YiX6KGoIiwiY29tcG9uZW50IjoiUGxhY2FyZExpc3RQYWdlIiwiaWNvbiI6IkRlc2t0b3BPdXRsaW5lZCIsImlzX21lbnUiOnRydWUsImlzX3JvdXRlIjp0cnVlLCJwYXRoIjpbMTA1MDAwMDAwMCwxMDUwMjAwMDAwXSwidGl0bGVzIjpbIuWFrOWRiueuoeeQhiIsIuWFrOWRiuWIl+ihqCJdfSx7ImlkIjoxMDYwMDAwMDAwLCJwaWQiOjAsImtleSI6Ii91c2VycyIsInRpdGxlIjoi5biQ5oi3566h55CGIiwiY29tcG9uZW50IjoiVXNlciIsImljb24iOiJEZXNrdG9wT3V0bGluZWQiLCJpc19tZW51Ijp0cnVlLCJpc19yb3V0ZSI6ZmFsc2UsInBhdGgiOlsxMDYwMDAwMDAwXSwidGl0bGVzIjpbIuW4kOaIt+euoeeQhiJdfSx7ImlkIjoxMDYwMTAwMDAwLCJwaWQiOjEwNjAwMDAwMDAsImtleSI6Ii91c2Vycy91c2VyX2xpc3QiLCJ0aXRsZSI6IuW4kOaIt+WIl+ihqCIsImNvbXBvbmVudCI6IlVzZXJzTGlzdFBhZ2UiLCJpY29uIjoiRGVza3RvcE91dGxpbmVkIiwiaXNfbWVudSI6dHJ1ZSwiaXNfcm91dGUiOnRydWUsInBhdGgiOlsxMDYwMDAwMDAwLDEwNjAxMDAwMDBdLCJ0aXRsZXMiOlsi5biQ5oi3566h55CGIiwi5biQ5oi35YiX6KGoIl19LHsiaWQiOjEwNzAwMDAwMDAsInBpZCI6MCwia2V5IjoiL3VzZXJfcmVjaGFyZ2UiLCJ0aXRsZSI6IuWFheWAvOeuoeeQhiIsImNvbXBvbmVudCI6IlVzZXJSZWNoYXJnZSIsImljb24iOiJEZXNrdG9wT3V0bGluZWQiLCJpc19tZW51Ijp0cnVlLCJpc19yb3V0ZSI6ZmFsc2UsInBhdGgiOlsxMDcwMDAwMDAwXSwidGl0bGVzIjpbIuWFheWAvOeuoeeQhiJdfSx7ImlkIjoxMDcwMTAwMDAwLCJwaWQiOjEwNzAwMDAwMDAsImtleSI6Ii91c2VyX3JlY2hhcmdlL3JlY2hhcmdlX2xpc3QiLCJ0aXRsZSI6IuWFheWAvOWIl+ihqCIsImNvbXBvbmVudCI6IlVzZXJSZWNoYXJnZUxpc3RQYWdlIiwiaWNvbiI6IkRlc2t0b3BPdXRsaW5lZCIsImlzX21lbnUiOnRydWUsImlzX3JvdXRlIjp0cnVlLCJwYXRoIjpbMTA3MDAwMDAwMCwxMDcwMTAwMDAwXSwidGl0bGVzIjpbIuWFheWAvOeuoeeQhiIsIuWFheWAvOWIl+ihqCJdfSx7ImlkIjoxMDgwMDAwMDAwLCJwaWQiOjAsImtleSI6Ii91c2VyX3dpdGhkcmF3IiwidGl0bGUiOiLmj5DnjrDnrqHnkIYiLCJjb21wb25lbnQiOiJVc2VyV2l0aGRyYXciLCJpY29uIjoiRGVza3RvcE91dGxpbmVkIiwiaXNfbWVudSI6dHJ1ZSwiaXNfcm91dGUiOmZhbHNlLCJwYXRoIjpbMTA4MDAwMDAwMF0sInRpdGxlcyI6WyLmj5DnjrDnrqHnkIYiXX0seyJpZCI6MTA4MDEwMDAwMCwicGlkIjoxMDgwMDAwMDAwLCJrZXkiOiIvdXNlcl93aXRoZHJhdy93aXRoZHJhd19saXN0IiwidGl0bGUiOiLmj5DnjrDliJfooagiLCJjb21wb25lbnQiOiJVc2VyV2l0aGRyYXdMaXN0UGFnZSIsImljb24iOiJEZXNrdG9wT3V0bGluZWQiLCJpc19tZW51Ijp0cnVlLCJpc19yb3V0ZSI6dHJ1ZSwicGF0aCI6WzEwODAwMDAwMDAsMTA4MDEwMDAwMF0sInRpdGxlcyI6WyLmj5DnjrDnrqHnkIYiLCLmj5DnjrDliJfooagiXX0seyJpZCI6MTA5MDAwMDAwMCwicGlkIjowLCJrZXkiOiIvdXNlcl9zd2FwIiwidGl0bGUiOiLlhZHmjaLnrqHnkIYiLCJjb21wb25lbnQiOiJVc2VyU3dhcCIsImljb24iOiJEZXNrdG9wT3V0bGluZWQiLCJpc19tZW51Ijp0cnVlLCJpc19yb3V0ZSI6ZmFsc2UsInBhdGgiOlsxMDkwMDAwMDAwXSwidGl0bGVzIjpbIuWFkeaNoueuoeeQhiJdfSx7ImlkIjoxMDkwMTAwMDAwLCJwaWQiOjEwOTAwMDAwMDAsImtleSI6Ii91c2VyX3N3YXAvc3dhcF9saXN0IiwidGl0bGUiOiLlhZHmjaLliJfooagiLCJjb21wb25lbnQiOiJVc2VyU3dhcExpc3RQYWdlIiwiaWNvbiI6IkRlc2t0b3BPdXRsaW5lZCIsImlzX21lbnUiOnRydWUsImlzX3JvdXRlIjp0cnVlLCJwYXRoIjpbMTA5MDAwMDAwMCwxMDkwMTAwMDAwXSwidGl0bGVzIjpbIuWFkeaNoueuoeeQhiIsIuWFkeaNouWIl+ihqCJdfSx7ImlkIjoxMTAwMDAwMDAwLCJwaWQiOjAsImtleSI6Ii9jaGFuZ2VfbG9nIiwidGl0bGUiOiLml6Xlv5fnrqHnkIYiLCJjb21wb25lbnQiOiJDaGFuZ2VMb2ciLCJpY29uIjoiRGVza3RvcE91dGxpbmVkIiwiaXNfbWVudSI6dHJ1ZSwiaXNfcm91dGUiOmZhbHNlLCJwYXRoIjpbMTEwMDAwMDAwMF0sInRpdGxlcyI6WyLml6Xlv5fnrqHnkIYiXX0seyJpZCI6MTEwMDEwMDAwMCwicGlkIjoxMTAwMDAwMDAwLCJrZXkiOiIvY2hhbmdlX2xvZy9jaGFuZ2VfbG9nX2xpc3QiLCJ0aXRsZSI6IuaXpeW/l+WIl+ihqCIsImNvbXBvbmVudCI6IkNoYW5nZUxvZ1BhZ2UiLCJpY29uIjoiRGVza3RvcE91dGxpbmVkIiwiaXNfbWVudSI6dHJ1ZSwiaXNfcm91dGUiOnRydWUsInBhdGgiOlsxMTAwMDAwMDAwLDExMDAxMDAwMDBdLCJ0aXRsZXMiOlsi5pel5b+X566h55CGIiwi5pel5b+X5YiX6KGoIl19XQ==';
        const s = stream.Readable.from( Buffer.from( str ) )
        /*
        const toUp = new stream.Transform( {
            async transform(chunk:any, encoding:any, next:any){
                this.push( chunk )
                next()
            }
        } )
        */
        const tUp = new TransformStream( {
            async transform(chunk, controller){
                controller.enqueue( chunk )
            }
        } )
        //return stream.Readable.fromWeb( ws.stream().pipeThrough( toUp ) ).pipe( res )
        /*
        return stream.pipeline(
            new Blob( [str], {type: "text/plain"} ).stream(),
            tUp,
            res,
            (err:any)=> err && res.end(err.message)
        )
        */
        
        return s.pipe( tUp ).pipe( res )
    }

    async get_pdf( req:any, res:any ){
        const path = require( "path" )
        const filePath = path.resolve( __dirname, "../src/Routers/static/图解HTTP.pdf" )
        const stream = require( "stream" )
        const fs = require( "fs" )
        const fileStream = fs.createReadStream( filePath )
        const fileState = fs.statSync( filePath )
        res.setHeader( "Content-Length", fileState.size )
        res.setHeader( "Content-Type", "application/pdf" )
        //res.setHeader( "Content-Disposition", "attachment; filename=haha.pdf" )
        return fileStream.pipe( res )
    }

    async get_pdfs( req:any, res:any ){
        const path = require( "path" )
        const filePath = path.resolve( __dirname, "../src/Routers/static/HTTP权威指南.pdf" )
        const stream = require( "stream" )
        const fs = require( "fs" )
        const fileStream = fs.createReadStream( filePath )
        const fileState = fs.statSync( filePath )
        res.setHeader( "Content-Length", fileState.size )
        res.setHeader( "Content-Type", "application/pdf" )
        //res.setHeader( "Content-Disposition", "attachment; filename=haha.pdf" )
        return fileStream.pipe( res )
    }

    async test(req:any, res:any){
        const stream = require( "stream" )
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
        .pipe( require("zlib").createGzip() )
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