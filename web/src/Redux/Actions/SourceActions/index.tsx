import * as types from "Redux/Constants"
import {Dispatch} from "redux"

//INIT_SOURCE_EVENT
export const InitSourceEvent = function(param:any[]){
    return async(dispatch:Dispatch)=>{
        try{
            const data = new Proxy( function*(){
                for( let i = 0; i < 3; ++i ){
                    yield `${i}: hello world ~`
                }
            }, {
                apply: function(...args){
                    return [...Reflect.apply(...args)]
                }
            } )() as unknown as any[]
            dispatch({
                type: types.INIT_SOURCE_EVENT,
                data,
            })
            return true
        }catch(err:any){
            console.log( err.message )
            return false;
        }finally{
            console.log( "初始化" )
        }

    }
}

//ADD_SOURCE_EVENT
export const AddSourceEvent = function(param:string){
    return async(dispatch:Dispatch)=>{
        try{
            dispatch({
                type: types.ADD_SOURCE_EVENT,
                data: param,
            })
            return true;
        }catch(err:any){
            console.log(  err.message )
            return false;
        }finally{
            console.log( "新消息" )
        }
    }
}

