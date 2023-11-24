//import iconImg from "./static/1696385680872.png"
//import iconImg from "./static/283027972fa3da6c.png"
import iconImg from "./static/9103.gif_wh860.gif"
//import iconImg from "./static/9ea82d34095a131b05b1c2136209ccea.gif"
abstract class IShow{
    x:number = 0;
    y:number = 0;
    matrix:number[][] = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
    ]
    angel:number = 0;
    width:number = 0;
    height:number = 0;
    dom:any;
}

const Init = new Proxy( function():ClassDecorator{
    return (SonComponent:any):any=>{
        return class extends SonComponent{
            constructor(props:any, parent:any){
                super();
                Object.assign( this, props )
                this.matrix = getAxis( this.matrix, [
                    [1, 0, 0, 0],
                    [0, 1, 0, 0],
                    [0, 0, 1, 0],
                    [0, 0, 0, 1],
                ] )
                this.dom = new Image()
                this.dom.src = iconImg;
                this.dom.addEventListener( "load", ()=>{
                    const W = this.dom.width;
                    const H = this.dom.height;
                    console.log( W, H, this.width, this.height );
                    this.dom.width = this.width;
                    this.dom.height = this.height;
                    this.dom.style.transform = matrixCss( this.matrix )
                    // this.dom.style.position = "absolute";
                    // this.dom.style.left = -this.width / 2 + "px";
                    // this.dom.style.top = -this.height / 2 + "px";
                    this.dom.style.transformOrigin = "100px 100px";
                    //this.dom.style.boxShadow = "10px 10px 10px rgba(0, 0, 0, 0.5)";
                    this.dom.style.filter = "drop-shadow(10px 10px 10px rgba(0, 255, 0, 0.9))";

                    const txt = document.createElement( "div" )
                    txt.style.background = "#FFF"
                    txt.style.width = this.width + "px"
                    txt.style.height = this.height + "px"
                    txt.style.position = "absolute"
                    txt.style.top = "0"
                    txt.style.left = "0"
                    txt.innerHTML = "Dream"
                    txt.style.fontSize = "500px"
                    txt.style.textAlign = "center"
                    txt.style.fontWeight = "800"
                    txt.style.lineHeight = this.height + "px"
                    txt.style.mixBlendMode = "screen"
                    parent.appendChild( this.dom )
                    parent.appendChild( txt )
                } )
                return this;
            }
        }
    }
}, {apply(...args){ return Reflect.apply(...args) }} )

@Init()
class Show extends IShow{
    constructor(props:any, parent:any){
        super();
    }

    update(){
        const angel = 1/180 * Math.PI;
        const zRotate = [
            [Math.cos( angel ), -Math.sin( angel ), 0, 0],
            [Math.sin( angel ), Math.cos( angel ), 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1],
        ]
        const yRotate = [
            [Math.cos( angel ), 0, -Math.sin( angel ), 0],
            [0, 1, 0, 0],
            [Math.sin( angel ), 0, Math.cos( angel ), 0],
            [0, 0, 0, 1],
        ]
        const xRotate = [
            [1, 0, 0, 0],
            [0, Math.cos( angel ), -Math.sin( angel ), 0],
            [0, Math.sin( angel ), Math.cos( angel ), 0],
            [0, 0, 0, 1],
        ]
        this.matrix = getAxis( this.matrix, zRotate )
        //this.matrix = getAxis( this.matrix, xRotate )
        //this.matrix = getAxis( this.matrix, yRotate )
        this.dom.style.transform = matrixCss( this.matrix )
        return ;
    }
}

export default class Img{
    static container:any;
    static offset:any;
    static W:number;
    static H:number;

    constructor(domID:string){
        Img.container = document.getElementById( domID )
        Img.offset = Img.container.getBoundingClientRect()
        Img.W = Img.container.clientWidth;
        Img.H = Img.container.clientHeight;
    }

    render(){
        const show = new Show({
            x: Img.W / 2,
            y: Img.H / 2,
            width: Img.W,
            height: Img.H,
        }, Img.container)

        ;(function move(){
            //show.update()
            window.requestAnimationFrame( move )
        })();
    }
}