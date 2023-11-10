import {Component} from "react"
import {withRouter} from "react-router-dom"
import {connect} from "react-redux"
import styled from "styled-components"
import {
    getAxis,
    matrix3D,
} from "Common"

const matrix = new Proxy( function(angel:number){
    const matrix = [
        [1, 0, 0, 100],
        [0, 1, 0, 100],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
    ]
    const xRotate = [
        [1, 0, 0, 0],
        [0, Math.cos(angel), -Math.sin(angel), 0],
        [0, Math.sin( angel ), Math.cos(angel), 0],
        [0, 0, 0, 1],
    ]
    const yRotate = [
        [Math.cos(angel), 0, -Math.sin(angel), 0],
        [0, 1, 0, 0],
        [Math.sin( angel ), 0, Math.cos(angel), 0],
        [0, 0, 0, 1],
    ]
    const zRotate = [
        [Math.cos(angel), -Math.sin(angel), 0, 0],
        [Math.sin( angel ), Math.cos(angel), 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
    ]
    return getAxis( getAxis( matrix, zRotate ), yRotate )
}, {apply:(...args)=>{
    const ANS = Reflect.apply( ...args )
    const res = matrix3D( ANS )
    return `matrix3d(${res.join(',')})`
}} )(Math.PI / 6);


const Info = styled.div`
    width: 500px;
    height: 500px;
    background: green;
    transform: ${matrix};
`

const HomeParent = new Proxy( function(SonComponent:any){
    return class extends Component<any>{
        
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
}, {apply: function(...args){
    return connect(
        (store:RootStore) => ({
            PrivateStructStore: store.PrivateStructStore,
        }),{

        }
    )( withRouter<any,any>( Reflect.apply( ...args ) ) )
}} )


@HomeParent
export default class Home extends Component<any>{
    render(){
        return (
            <>
                <Info>
                    <h1>hello world</h1>
                </Info>
            </>
        )
    }
}