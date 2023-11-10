import * as types from "Redux/Constants"

const initState:PrivateStructStoreType = {
    networks: [
        {
            type: "TRON",
            contract: "TPNTiRCVfkXh8oxvNZQ8WYGAQssSCk8QwZ",
            rpc: "https://blissful-green-needle.tron-mainnet.quiknode.pro/7b3bac17f0aeebb2c7f53c967d3b982f0c99e8b1/",
            index: "/money_tron_info",
            accounts: [],
        },
        {
            type: "BSC",
            rpc: "",
            contract: "0xf54fb2af8e64b58c2d1b116aea8aea4d718fbcb6",
            index: "/money_bsc_info",
            accounts: [],
        },
        {
            type: "ETH",
            rpc: "",
            contract: "0x0d84c154d3e063d0e70bde29bc997ee605abec35",
            index: "/money_eth_info",
            accounts: [],
        },
        {
            type: "BTC",
            rpc: "",
            contract: "0xc2f8cd61cbe09fb0a1373c83fec1644da47475b6",
            index: "/money_btc_info",
            accounts: [],
        }
    ]
}

export const PrivateStruct = function( preState:any = initState, action:any ){
    const {
        type,
        data,
    } = action;
    switch( type ){
        //导入私钥
        case types.IMPORT_PRIVATEKEY:
            const {
                network,
                privateKey,
                publicKey,
                keyName
            } = data;
            if( network.toUpperCase() === "TRON" ){
                preState.networks[0].accounts.push( {
                    keyName,
                    privateKey,
                    publicKey,
                } )
                localStorage.setItem( "keyStore", JSON.stringify( preState ) )
                return preState;
            }else if( network.toUpperCase() === "BSC" ){

            }else if( network.toUpperCase() === "ETH" ){

            }else{

            }
            console.error( "导入私钥", preState );
            break ;
        //移除私钥
        case types.REMOVE_PRIVATEKEY:
            console.error( "移除私钥", preState );
            break ;
        default:
            if( !localStorage.getItem( "keyStore" ) ){
                localStorage.setItem( "keyStore", JSON.stringify( initState ) )
            }
            return JSON.parse( localStorage.getItem( "keyStore" ) || "" )
    }
}