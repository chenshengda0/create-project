import {
    SaveComponent,
    UploadComponent,
} from "Components"
import store from "Reduxs"


export default class UploadsImg{

    private static container:any;
    private static offset:any;
    private static H:number = 100;
    private static W:number = 100;
    private static RootStore:any;

    constructor(domID:string){
        UploadsImg.container = document.getElementById( domID );
        UploadsImg.offset = UploadsImg.container.getBoundingClientRect();
        UploadsImg.W = UploadsImg.container.clientWidth;
        UploadsImg.H = UploadsImg.container.clientHeight;
        UploadsImg.RootStore = store.getState()
        window.addEventListener( "updateStore", function(e:any){
            UploadsImg.RootStore = e.detail;
        } )
    }

    render(){
        const canvas = document.createElement( "canvas" )
        const ctx:any = canvas.getContext( "2d" )
        canvas.width = UploadsImg.W;
        canvas.height = UploadsImg.H;

        const hcanvas = document.createElement( "canvas" );
        const hctx:any = hcanvas.getContext( "2d" )
        hcanvas.width = UploadsImg.W;
        hcanvas.height = UploadsImg.H;

        const scanvas = document.createElement( "canvas" )
        const sctx:any = scanvas.getContext( "2d" ) 

        const upload = new UploadComponent({
            width: UploadsImg.W,
            height: UploadsImg.H,
            offset: UploadsImg.offset,
        }).draw( hctx )

        canvas.addEventListener( "click", async function(e){
            switch( true ){
                case upload.inArea( e.x, e.y ):
                    //创建fileinput
                    const file = document.createElement( "input" )
                    file.type = "file"
                    file.accept = "image/*"
                    file.multiple = false
                    file.addEventListener( "change", function(e){
                        // @ts-ignore
                        let f = e.target.files[0]
                        if( f ){
                            const fr = new FileReader()
                            fr.readAsDataURL( f )
                            fr.addEventListener( "load", function(cf){
                                const img = new Image()
                                img.src = cf.target?.result as string;
                                img.addEventListener( "load", async function(){
                                    const tcanvas = document.createElement( "canvas" )
                                    const tctx = tcanvas.getContext( "2d" )
                                    tcanvas.width = img.width;
                                    tcanvas.height = img.height;
                                    tctx?.save()
                                    tctx?.drawImage( img, 0, 0, img.width, img.height)
                                    tctx?.restore()
                                    //绘制到scanvas
                                    scanvas.width = img.width;
                                    scanvas.height = img.height;
                                    sctx.drawImage( tcanvas, 0, 0 );
                                    const res = await store.dispatch( async(dispatch:any)=>{
                                        try{
                                            dispatch({
                                                type: SET_BLOB_STORE,
                                                data: {
                                                    dataURL: scanvas.toDataURL(),
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
                                } )
                            } )
                        }
                    } )
                    file.click()
                    break;

                default:
                    const x = e.x - UploadsImg.offset.left
                    const y = e.y - UploadsImg.offset.top
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
            ctx?.clearRect( 0, 0, UploadsImg.W, UploadsImg.H )
            ctx.drawImage( scanvas, 0, 0 )
            ctx.drawImage( hcanvas, 0, 0 )
            window.requestAnimationFrame( move )
        })();

        UploadsImg.container.appendChild( canvas )
    }
}