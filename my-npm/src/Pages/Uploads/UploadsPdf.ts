import {
    SaveComponent,
    UploadComponent,
} from "Components"
import store from "Reduxs";


const setWindowEvents = new Proxy( function(){
    return (SonComponent:any):any=>{
        return class PackageComponent extends SonComponent{
            constructor( domID:string ){
                super( domID )
                console.log( "执行代理6" )
            }

            render(){
                PackageComponent.canvas.addEventListener( "click", async function(e:any){
                    switch( true ){
                        case PackageComponent.upload.inArea( e.x, e.y ):
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
                                        const res = await PackageComponent.props.SetBlobAction( blobURL )
                                        console.log( res )
                                        const showDIV = document.createElement( "object" )
                                        showDIV.width = PackageComponent.W as unknown as string;
                                        showDIV.height = PackageComponent.H as unknown as string;
                                        showDIV.data = PackageComponent.RootStore.BlobStore.dataURL;
                                        document.body.removeChild( PackageComponent.container )
                                        document.body.appendChild( showDIV )
                                    } )
                                }
                            } )
                            file.click()
                            break;
        
                        default:
                            const x = e.x - PackageComponent.offset.left
                            const y = e.y - PackageComponent.offset.top
                            //获取当前点颜色
                            const metaData:any = PackageComponent.ctx.getImageData( x, y , 1, 1 )
                            const res = await PackageComponent.props.SetColorAction( x, y, metaData )
                            console.log( res )
                            break;
                    }
                } );
                ;(function move(){
                    PackageComponent.ctx.clearRect( 0, 0, PackageComponent.W, PackageComponent.H )
                    PackageComponent.ctx.drawImage( PackageComponent.scanvas, 0, 0 )
                    PackageComponent.upload.draw( PackageComponent.hctx )
                    PackageComponent.ctx.drawImage( PackageComponent.hcanvas, 0, 0 )
                    window.requestAnimationFrame( move )
                })();
        
                PackageComponent.container.appendChild( PackageComponent.canvas )
            }
        }
    }
}, {apply:(...args)=>Reflect.apply(...args)} )

const setShowCanavas = new Proxy( function(){
    return (SonComponent:any):any=>{
        return class PackageComponent extends SonComponent{
            constructor( domID:string ){
                super( domID )
                console.log( "执行代理5" )
                PackageComponent.scanvas = document.createElement( "canvas" )
                PackageComponent.sctx = PackageComponent.scanvas.getContext( "2d" )
                PackageComponent.scanvas.width = PackageComponent.W;
                PackageComponent.scanvas.height = PackageComponent.H;
            }
        }
    }
}, {
    apply(...args){ return Reflect.apply(...args) }
} )

const setHandleCanavas = new Proxy( function(){
    return (SonComponent:any):any=>{
        return class PackageComponent extends SonComponent{
            constructor( domID:string ){
                super( domID )
                console.log( "执行代理4" )
                PackageComponent.hcanvas = document.createElement( "canvas" )
                PackageComponent.hctx = PackageComponent.hcanvas.getContext( "2d" )
                PackageComponent.hcanvas.width = PackageComponent.W;
                PackageComponent.hcanvas.height = PackageComponent.H;
                PackageComponent.upload = new UploadComponent({
                    width: PackageComponent.W,
                    height: PackageComponent.H,
                    offset: PackageComponent.offset,
                }).draw( PackageComponent.hctx )
            }
        }
    }
}, {
    apply(...args){ return Reflect.apply(...args) }
} )

const setMainCanavas = new Proxy( function(){
    return (SonComponent:any):any=>{
        return class PackageComponent extends SonComponent{
            constructor( domID:string ){
                super( domID )
                console.log( "执行代理3" )
                PackageComponent.canvas = document.createElement( "canvas" )
                PackageComponent.ctx = PackageComponent.canvas.getContext( "2d" )
                PackageComponent.canvas.width = PackageComponent.W;
                PackageComponent.canvas.height = PackageComponent.H;
            }
        }
    }
}, {
    apply(...args){ return Reflect.apply(...args) }
} )

const connect = new Proxy( function(mapDispatchToProps:any){
    return (SonComponent:any):any=>{
        return class PackageComponent extends SonComponent{
            constructor( domID:string ){
                super( domID )
                console.log( "执行代理2" )
                PackageComponent.RootStore = store.getState();
                window.addEventListener( "updateStore", function(e:any){
                    PackageComponent.RootStore = e.detail;
                } )
                PackageComponent.props = mapDispatchToProps;
            }
        }
    }
}, {
    apply(...args){ return Reflect.apply(...args) }
} )


const UploadsPdfParent = new Proxy( function():ClassDecorator{
    return (SonComponent:any):any=>{
        class PackageComponent extends SonComponent{
            constructor(domID:string){
                super(domID);
                console.log( "执行代理1" )
                PackageComponent.container = document.getElementById( domID );
                PackageComponent.offset = PackageComponent.container.getBoundingClientRect();
                PackageComponent.W = PackageComponent.container.clientWidth;
                PackageComponent.H = PackageComponent.container.clientHeight;
            }
        }
        return PackageComponent;
    }
}, {apply(...args){ return Reflect.apply(...args) }} );


abstract class IUploadsPdf{
    protected static container:any;
    protected static RootStore:any;
    protected static offset:any;
    protected static H:number = 100;
    protected static W:number = 100;

    protected static canvas:any;
    protected static ctx:any;

    protected static hcanvas:any;
    protected static hctx:any;
    protected static upload:any;

    protected static scanvas:any;
    protected static sctx:any;

    protected static props:any;

    abstract render():any;
}

@setWindowEvents()
@setShowCanavas()
@setHandleCanavas()
@setMainCanavas()
@connect({
    SetColorAction: async(x:number, y:number, metaData:any)=>{
        const r = metaData.data[0]
        const g = metaData.data[1]
        const b = metaData.data[2]
        const a = metaData.data[3] / 255
        const gray = (r * 0.3 + g * 0.59 + b * 0.11) | 0;
        return await store.dispatch( async(dispatch:any)=>{
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
    },
    SetBlobAction: async(blobURL:string)=>{
        return await store.dispatch( async(dispatch:any)=>{
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
    }
})
@UploadsPdfParent()
export default class UploadsPdf extends IUploadsPdf{
    render(){}
}