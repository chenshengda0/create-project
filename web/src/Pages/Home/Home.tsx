import {
    Component,
    createRef,
} from "react"
import {withRouter} from "react-router-dom"
import {connect} from "react-redux"
import styled from "styled-components"

const Init = new Proxy( function():ClassDecorator{
    return (SonComponent:any):any=>{
        return class extends SonComponent{
            constructor(props:any, parent:any){
                super();
                Object.assign( this, props )
                this.matrix = getAxis( this.matrix, [
                    [1, 0, 0, this.x],
                    [0, 1, 0, this.y],
                    [0, 0, 1, 0],
                    [0, 0, 0, 1],
                ] )
                this.div = document.createElement( "div" ) as any;
                this.div.style.background = this.fillStyle;
                this.div.style.width = (this.r << 1)  + "px";
                this.div.style.height = (this.r << 1) + "px";
                this.div.style.borderRadius = "50%";
                this.div.style.transform = `${matrixCss( this.matrix )}`
                this.div.style.position = "absolute";
                this.div.style.top = -this.r + "px";
                this.div.style.left = -this.r + "px";
                parent.appendChild( this.div )
                return this;
            }
        }
    }
}, {apply(...args){return Reflect.apply(...args)}} )

//初始化
abstract class IShow{
    x:number = 0;
    y:number = 0;
    fillStyle:string = "red"
    vx:number = 0;
    vy:number = 0;
    r:number = 0;
    angel:number = 0;
    width:number = 0;
    height:number = 0;
    matrix:number[][] = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
    ]
    div:any;

    abstract update():any;
}

@Init()
class Show extends IShow{

    constructor(props:any, parent:any){
        super()
    }

    update(){
        this.x +=  this.vx;
        this.y += this.vy;
        //边界检测
        if( this.x - this.r <= 0 ){
            this.x = this.r;
            this.vx *= -1;
        }
        if( this.x + this.r >= this.width ){
            this.x = this.width - this.r;
            this.vx *= -1;
        }
        if( this.y - this.r <= 0 ){
            this.y = this.r;
            this.vy *= -1;
        }
        if( this.y + this.r >= this.height ){
            this.y = this.height - this.r;
            this.vy *= -1;
        }
        this.matrix = [
            [1, 0, 0 ,this.x ],
            [0, 1, 0 ,this.y ],
            [0, 0, 1 ,0 ],
            [0, 0, 0 ,1 ],
        ]
        this.div.style.transform = `${matrixCss( this.matrix )}`
    }


}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
`

const HomeParent = new Proxy( function():ClassDecorator{
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


@HomeParent()
export default class Home extends Component<any>{

    static dom = createRef()

    constructor(props:any){
        super( props );
    }

    rotate = ()=>{
        const angel = 1/ 180 * Math.PI;
        const xRotate = [
            [1, 0, 0, 0],
            [0, Math.cos( angel ), -Math.sin( angel ), 0],
            [0, Math.sin( angel ), Math.cos( angel ), 0],
            [0, 0, 0, 1],
        ]
        const yRotate = [
            [Math.cos( angel ), 0, -Math.sin( angel ), 0],
            [0, 1, 0, 0],
            [Math.sin( angel ), 0, Math.cos( angel ), 0],
            [0, 0, 0, 1],
        ]
        const zRotate = [
            [Math.cos( angel ), -Math.sin( angel ), 0, 0],
            [Math.sin( angel ), Math.cos( angel ), 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1],
        ]
        this.setState( {
            m: getAxis( [
                [1, 0, 0, 0],
                [0, 1, 0, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 1],
            ], zRotate )
        } )
        window.requestAnimationFrame( this.rotate );
    }

    componentDidMount(){
        const dom = Home.dom.current as unknown as HTMLDivElement;
        const offset = dom.getBoundingClientRect()
        const W = dom.clientWidth;
        const H = dom.clientHeight;
        const doms = new Proxy( function*(){
            for( let i = 0; i < 10; ++i ){
                yield new Show( {
                    x: getRandom( [0, W] ),
                    y: getRandom( [0, H] ),
                    r: getRandom( [30, 50] ),
                    vx: getRandom( [-3, 3] ),
                    vy: getRandom( [-3, 3] ),
                    fillStyle: `rgba( ${getRandom([0, 128],true)},${getRandom([0, 128],true)},${getRandom([0, 128],true)}, ${getRandom([0.5, 1])} )`,
                    width: W,
                    height: H,
                }, dom );
            }
        }, {apply(...args){return [...Reflect.apply(...args)]}} )() as unknown as Show[];
        //获取碰撞检测dom对
        const domList = new Proxy( function*(){
            const list:Show[][] = []
            const dfs = function(index:number = 0, temp:Show[] = []){
                switch(true){
                    case temp.length === 2:
                        list.push( [...temp] )
                        return ;
                    default:
                        for( let i = index; i < doms.length; ++i ){
                            dfs( i+1, [...temp, doms[i]] )
                        }
                }
            }
            dfs()
            yield* list;
        }, {apply(...args){return [...Reflect.apply(...args)]}} )() as unknown as Show[][];

        ;(function move(){
            doms.map( row => row.update() )
            domList.map( ([dom0, dom1])=>{
                //计算两个小球的距离
                const dist = Math.sqrt( (dom0.x - dom1.x) ** 2 + (dom0.y - dom1.y) ** 2 )
                if( dist >  dom0.r + dom1.r ) return ;
                //获取旋转角度
                const angel = Math.atan2( dom1.y - dom0.y, dom1.x - dom0.x )
                //以dom0为中心点旋转
                let x0 = 0;
                let y0 = 0;
                let matrix = [
                    [ Math.cos( angel ), Math.sin( angel ), 0, 0 ],
                    [ -Math.sin( angel ), Math.cos( angel ), 0, 0 ],
                    [ 0, 0, 1, 0 ],
                    [ 0, 0, 0, 1 ]
                ]
                //计算dom1位置
                const dom1Pos = getAxis( matrix, [ [dom1.x - dom0.x , dom1.y - dom0.y , 0, 1] ], true )
                let x1 = dom1Pos[0][0]
                let y1 = dom1Pos[0][1]
                const dom0V = getAxis( matrix, [ [dom0.vx, dom0.vy, 0 , 1] ], true )
                const dom1V = getAxis( matrix, [ [dom1.vx, dom1.vy, 0 , 1] ], true )
                let dom0vx = dom0V[0][0]
                let dom0vy = dom0V[0][1]
                let dom1vx = dom1V[0][0]
                let dom1vy = dom1V[0][1]
                //碰撞后的速度
                const dom0vxFinal = ( ( dom0.r - dom1.r ) * dom0vx  + 2 * dom1.r * dom1vx ) / ( dom0.r + dom1.r )
                const dom1vxFinal = ( ( dom1.r - dom0.r ) * dom1vx  + 2 * dom0.r * dom0vx ) / ( dom0.r + dom1.r )
                //计算重合深度
                const lep = ( (dom0.r + dom1.r) - Math.abs( x1 - x0 ) ) / 2;
                //重置两个小球位置
                x0 = x0 + ( dom0vxFinal < 0 ? -lep : lep )
                x1 = x1 + ( dom1vxFinal < 0 ? -lep : lep )
                //还原矩阵
                matrix = [
                    [ Math.cos( angel ), -Math.sin( angel ), 0, 0 ],
                    [ Math.sin( angel ), Math.cos( angel ), 0, 0 ],
                    [ 0, 0, 1, 0 ],
                    [ 0, 0, 0, 1 ]
                ]
                const odom1 = getAxis( matrix, [ [x1, y1, 0, 1] ], true )
                const odom0 = getAxis( matrix, [ [x0, y0, 0, 1] ], true )
                
                dom1.x = odom1[0][0] + dom0.x
                dom1.y = odom1[0][1] + dom0.y
                dom0.x = odom0[0][0] + dom0.x
                dom0.y = odom0[0][1] + dom0.y
                //还原速度
                const odom0v = getAxis( matrix, [ [dom0vxFinal, dom0vy, 0, 1] ], true )
                const odom1v = getAxis( matrix, [ [dom1vxFinal, dom1vy, 0, 1] ], true )
                dom0.vx = odom0v[0][0]
                dom0.vy = odom0v[0][1]
                dom1.vx = odom1v[0][0]
                dom1.vy = odom1v[0][1]
            } )
            window.requestAnimationFrame( move )
        })();
    }

    render(){
        return (
            <>
                <Container ref={Home.dom as any}></Container>
            </>
        )
    }
}