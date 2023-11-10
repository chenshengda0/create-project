import * as types from "Redux/Constants"
import CryptoJS from "crypto-js"

const initState:RandomKeyStoreType = {
    randomKey: "",
    randomIV: ""
}

export const RandomKey = function(preState = initState, action:any){
    try{
        const {
            type,
            data
        } = action;
        switch( type ){
            default:
                if( !(localStorage.getItem( "randomKey" ) &&  localStorage.getItem( "randomIV" )) ){
                    localStorage.setItem( "randomKey", JSON.stringify( CryptoJS.lib.WordArray.random( 32 ) ) );
                    localStorage.setItem( "randomIV",  JSON.stringify( CryptoJS.lib.WordArray.random(16) ) );
                }
                return {
                    randomKey: localStorage.getItem( "randomKey" ),
                    randomIV: localStorage.getItem( "randomIV" ),
                }
        }
    }catch(err){
        console.error( "err: ", err )
    }finally{
        console.error( "生成随机数" )
    }
}