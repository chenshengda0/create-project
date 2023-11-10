import * as types from "Redux/Constants"

const initState:any[] = []

export const SourceEvent = function(preState = initState, action:any){
    try{
        const {
            type,
            data
        } = action;
        switch( type ){
            case types.INIT_SOURCE_EVENT:
                console.log( data )
                return [...data]

            case types.ADD_SOURCE_EVENT:
                return [...preState, data]
                
            default:
                return preState;
        }
    }catch(err){
        console.error( "err: ", err )
    }finally{
        console.error( "初始化SourceEvent~" )
    }
}