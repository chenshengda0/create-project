import {
    Component,
    createRef,
} from "react"
import {withRouter} from "react-router-dom"
import {connect} from "react-redux"
import styled from "styled-components"
import iconImg from "../../logo.svg"

const Container = styled.div`
    width: 100vw;
    height: 100vh;
`

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

const InitShow = new Proxy( function():ClassDecorator{
    return (SonComponent:any):any=>{
        return class extends SonComponent{
            constructor(props:any, parent:any){
                super();
                Object.assign( this, props )
                this.matrix = getAxis( this.matrix, [
                    [1, 0, 0, this.width / 2],
                    [0, 1, 0, this.height / 2],
                    [0, 0, 1, 0],
                    [0, 0, 0, 1],
                ] )
                this.dom = new Image()
                this.dom.src = iconImg;
                this.dom.addEventListener( "load", ()=>{
                    const W = 500;
                    const H = 500;
                    this.dom.width = W;
                    this.dom.height = H;
                    this.dom.style.transform = matrixCss( this.matrix )
                    this.dom.style.position = "absolute";
                    this.dom.style.left = -W / 2 + "px";
                    this.dom.style.top = -H / 2 + "px";
                    //this.dom.style.transformOrigin = "100px 100px";
                    //this.dom.style.boxShadow = "10px 10px 10px rgba(0, 0, 0, 0.5)";
                    //this.dom.style.filter = "drop-shadow(10px 10px 10px rgba(0, 255, 0, 0.9))";

                    // const txt = document.createElement( "div" )
                    // txt.style.background = "#FFF"
                    // txt.style.width = this.width + "px"
                    // txt.style.height = this.height + "px"
                    // txt.style.position = "absolute"
                    // txt.style.top = "0"
                    // txt.style.left = "0"
                    // txt.innerHTML = "Dream"
                    // txt.style.fontSize = "500px"
                    // txt.style.textAlign = "center"
                    // txt.style.fontWeight = "800"
                    // txt.style.lineHeight = this.height + "px"
                    // txt.style.mixBlendMode = "screen"
                    parent.appendChild( this.dom )
                    //parent.appendChild( txt )
                } )
                return this;
            }
        }
    }
}, {apply(...args){ return Reflect.apply(...args) }} )


@InitShow()
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
        this.matrix = getAxis( this.matrix, xRotate )
        this.matrix = getAxis( this.matrix, yRotate )
        this.dom.style.transform = matrixCss( this.matrix )
        return ;
    }
}

const RotateParent = new Proxy( function():ClassDecorator{
    return (SonComponent:any):any => {
        class PackageComponent extends Component<any>{
        
            UNSAFE_componentWillMount(){
                
            }
    
            render(){
                return(
                    <>
                        <SonComponent {...Object.assign(
                            {
                                ...this.props,
                            },
                            {},
                            {}
                        )}></SonComponent>
                    </>
                )
            }
        }

        return connect(
            (store:RootStore) => ({
                PrivateStructStore: store.PrivateStructStore,
            }),{
    
            }
        )( withRouter<any,any>( PackageComponent ) )
    }
}, {apply: function(...args){
    return Reflect.apply( ...args )
}} );

@RotateParent()
export default class Rotate extends Component<any>{

    static dom = createRef()

    constructor(props:any){
        super( props );
    }

    componentDidMount(){
        const dom = Rotate.dom.current as unknown as HTMLDivElement;
        const offset = dom.getBoundingClientRect()
        const W = dom.clientWidth;
        const H = dom.clientHeight;
        const show = new Show( {
            x: W / 2,
            y: H / 2,
            width: W,
            height: H,
        }, dom )
        ;(function move(){
            show.update()
            window.requestAnimationFrame( move )
        })();
    }

    render(){
        return (
            <>
                <Container ref={Rotate.dom as any}></Container>
            </>
        )
    }
}
