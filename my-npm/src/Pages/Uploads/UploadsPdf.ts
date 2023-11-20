import {
    SaveComponent,
    UploadComponent,
} from "Components"
import store from "Reduxs"


export default class UploadsPdf{

    private static container:any;
    private static RootStore:any;
    private static offset:any;
    private static H:number = 100;
    private static W:number = 100;

    constructor(domID:string){
        UploadsPdf.container = document.getElementById( domID );
        UploadsPdf.offset = UploadsPdf.container.getBoundingClientRect();
        UploadsPdf.W = UploadsPdf.container.clientWidth;
        UploadsPdf.H = UploadsPdf.container.clientHeight;
        UploadsPdf.RootStore = store.getState();
        window.addEventListener( "updateStore", function(e:any){
            UploadsPdf.RootStore = e.detail;
        } )
    }

    render(){
        const canvas = document.createElement( "canvas" )
        const ctx:any = canvas.getContext( "2d" )
        canvas.width = UploadsPdf.W;
        canvas.height = UploadsPdf.H;

        const hcanvas = document.createElement( "canvas" );
        const hctx:any = hcanvas.getContext( "2d" )
        hcanvas.width = UploadsPdf.W;
        hcanvas.height = UploadsPdf.H;

        const scanvas = document.createElement( "canvas" )
        const sctx:any = scanvas.getContext( "2d" ) 

        const upload = new UploadComponent({
            width: UploadsPdf.W,
            height: UploadsPdf.H,
            offset: UploadsPdf.offset,
        }).draw( hctx )

        canvas.addEventListener( "click", async function(e){
            switch( true ){
                case upload.inArea( e.x, e.y ):
                    //创建fileinput
                    const file = document.createElement( "input" )
                    file.type = "file"
                    file.accept = ".pdf,.txt"
                    file.multiple = false
                    file.addEventListener( "change", function(e){
                        // @ts-ignore
                        let f = e.target.files[0]
                        if( f ){
                            const fr = new FileReader()
                            fr.readAsDataURL( f )
                            fr.addEventListener( "load", async function(cf){
                                const blobURL = cf.target?.result as string;
                                const res = await store.dispatch( async(dispatch:any)=>{
                                    try{
                                        dispatch({
                                            type: SET_BLOB_STORE,
                                            data: {
                                                dataURL: blobURL.replace( /^[^;]+;/, (v:any)=> `${v}charset=utf-8;` ),
                                            }
                                        })
                                        return true;
                                    }catch(err){
                                        console.log( err )
                                        return false;
                                    }finally{
                                        console.log( "设置Blob dataURL" )
                                    }
                                } )
                                console.log( res )
                                const showDIV = document.createElement( "object" )
                                showDIV.width = UploadsPdf.W as unknown as string;
                                showDIV.height = UploadsPdf.H as unknown as string;
                                showDIV.data = UploadsPdf.RootStore.BlobStore.dataURL;
                                document.body.removeChild( UploadsPdf.container )
                                document.body.appendChild( showDIV )
                            } )
                        }
                    } )
                    file.click()
                    break;

                default:
                    const x = e.x - UploadsPdf.offset.left
                    const y = e.y - UploadsPdf.offset.top
                    //获取当前点颜色
                    const metaData:any = ctx.getImageData( x, y , 1, 1 )
                    const r = metaData.data[0]
                    const g = metaData.data[1]
                    const b = metaData.data[2]
                    const a = metaData.data[3] / 255
                    const gray = (r * 0.3 + g * 0.59 + b * 0.11) | 0;
                    const res = await store.dispatch( async(dispatch:any)=>{
                        try{
                            dispatch({
                                type: SET_COLOR_STORE,
                                data: {
                                    axis: [x, y],
                                    rgb: `rgba(${r},${g},${b},${a})`,
                                    hex: `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`,
                                    gray: `rgb(${gray},${gray},${gray},1)`,
                                }
                            })
                            return true;
                        }catch(err:any){
                            console.log(err)
                            return false;
                        }finally{
                            console.log( "设置颜色" )
                        }
                    } )
                    console.log( res )
                    break;
            }
        } );

        ;(function move(){
            ctx?.clearRect( 0, 0, UploadsPdf.W, UploadsPdf.H )
            ctx.drawImage( scanvas, 0, 0 )
            ctx.drawImage( hcanvas, 0, 0 )
            window.requestAnimationFrame( move )
        })();

        UploadsPdf.container.appendChild( canvas )
    }
}