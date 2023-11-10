#!/usr/bin/env node
import WithWeb3 from "./WithWeb3"
class Middleware{
    constructor(){}

    async checkAuth(req:any,res:any,next:any){
        console.log("======================================================REQSTART=====================================================================");
        try{
            const web3Provider = await WithWeb3.getInstance() as any;
            //console.log( web3Provider.currentProvider )
            const currentData = new Date().toDateString();
            const authorization = req.headers.authorization;
            //校验authorization 是否为真
            if( !authorization ) throw new Error("参数错误");
            const address = await web3Provider.eth.personal.ecRecover( currentData, authorization);
            const baseUrl = req.originalUrl;
            console.log( "address:", address )
            console.log( "baseUrl", baseUrl )
            const encodePacked = web3Provider.utils.encodePacked(
                web3Provider.eth.abi.encodeFunctionSignature({
                    "inputs": [
                      {
                        "internalType": "address",
                        "name": "userAddress_",
                        "type": "address"
                      },
                      {
                        "internalType": "string",
                        "name": "router_",
                        "type": "string"
                      }
                    ],
                    "name": "checkMenu",
                    "outputs": [
                      {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                      }
                    ],
                    "stateMutability": "view",
                    "type": "function",
                    "constant": true
                }),
                web3Provider.eth.abi.encodeParameters([
                    {
                        "name": "userAddress_",
                        "type": "address"
                    },
                    {
                        "name": "router_",
                        "type": "string"
                    }
                ],[address,baseUrl])
            );
            console.log( "链上请求数据:", encodePacked );
            // @ts-ignore
            console.log( "ADMIN_ADDRESS:", ADMIN_ADDRESS )
            const contractParam = await web3Provider.eth.call({
                // @ts-ignore
                to: ADMIN_ADDRESS,
                data: encodePacked
            })
            console.log( "链上返回数据: ", contractParam )
            const res = await new Promise( (resolve,reject)=>
                resolve( web3Provider.eth.abi.decodeParameters([
                    {
                        "name": "isExists",
                        "type": "bool"
                    }
                ],contractParam).isExists)
            ).catch( err => Promise.resolve( 0 ) ) as unknown as number;
            console.log( "解析数据:", res );
            if( !res ) throw new Error("校验失败");
            req["body"]["address"] = address;
            next();
        }catch(err:any){
            return res.json({
                code: 300,
                message: err.message,
                data: []
            })
        }finally{
            //验证账号是否过期
            console.log( `验证账号是否在有效期` )
            console.log("======================================================REQEND=======================================================================");
        }
    }

}

export default Middleware;