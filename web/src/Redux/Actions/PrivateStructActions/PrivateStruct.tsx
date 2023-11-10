import * as types from "Redux/Constants"
import {Dispatch} from "redux"

/*
    export const IMPORT_PRIVATEKEY = "IMPORT_PRIVATEKEY";
    export const REMOVE_PRIVATEKEY = "REMOVE_PRIVATEKEY";
*/
type ImportPrivateKeyParamType = {
    network: string,
    privateKey: string,
    publicKey: string,
    keyName: string,
}
export const ImportPrivateKey = function(param:ImportPrivateKeyParamType){
    return async(dispatch:Dispatch)=>{
        try{
            const {
                network,
                privateKey,
                publicKey,
                keyName,
            } = param;
            if( !["BTC", "BSC", "TRON", "ETH"].includes( network.toLocaleUpperCase() ) ) throw new Error("網絡錯誤")
            if( !keyName ) throw new Error("請輸入錢包名稱");
            if( !(privateKey || publicKey) ) throw new Error("參數有誤")
            dispatch({
                type: types.IMPORT_PRIVATEKEY,
                data: param,
            })
            return true;
        }catch(err:any){
            window.mui.toast( err.message )
            return false;
        }finally{
            console.error( "导入私钥" )
        }
    }
}

export const RemovePrivateKey = function(){
    return async(dispatch:Dispatch)=>{
        try{
            dispatch({
                type: types.REMOVE_PRIVATEKEY,
                data: {}
            })
            return true;
        }catch(err){
            console.error( err )
            return false;
        }finally{
            console.log( "移除私钥" )
        }
    }
}



