import {Component} from "react"
import {connect} from "react-redux"
import { Route, Redirect, withRouter } from 'react-router-dom'
import {
    createAesDePrivateKey,
} from "Common"
import BNBPng from "./static/BNB.png"
// const TronWeb = require( "tronweb" )

class CheckTronPrivate extends Component<any>{

    state = {
        network: "BSC",
    }

    render(){
        const {
            component: RouteComponent,
            ...rest
        } = this.props;
        //鏈信息
        const chainData = this.props.PrivateStructStore.networks.find( (row:any)=>row.type.toLocaleUpperCase() === this.state.network.toLocaleUpperCase() );
        //檢查是否有私鑰
        const isRedirect = chainData.accounts.length > 0;
        const insertParam:any = {};
        if( isRedirect ){
            insertParam.defaultPrivateKey =  createAesDePrivateKey( chainData.accounts[0].privateKey, this.props.RandomKeyStore.randomKey, this.props.RandomKeyStore.randomIV );
            insertParam.defaultNetwork = this.state.network;
            insertParam.defaultToken = "BNB";
            insertParam.defaultFeeLimit = 30000000;
            insertParam.defaultDecimal = 18;
            insertParam.defaultRPC = chainData.rpc;
            insertParam.defaultTokenImg = BNBPng;
            // insertParam.provider = new TronWeb({
            //     fullHost: chainData.rpc,
            //     privateKey,
            // })
        }
        return (
            <>
                {
                    isRedirect ? (
                        <>
                            <Route {...rest} render={(props) =>(<RouteComponent {...Object.assign( props, insertParam )} />)} />
                        </>
                    ) :(
                        <Redirect to="/import_bsc_private" />
                    )
                }
            </>
        )
    }

}


export default connect(
    (store: RootStore)=>({
        PrivateStructStore:  store.PrivateStructStore,
        RandomKeyStore: store.RandomKeyStore,
    }),{

    }
)( withRouter<any, any>( CheckTronPrivate ) )