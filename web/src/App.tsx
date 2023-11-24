import {Component} from "react"
import {connect} from "react-redux"
// import styled from "styled-components"
import { Switch, Redirect,withRouter,Route } from 'react-router-dom';
import {
    ImportPrivateKeyAction,
    RemovePrivateKeyAction,
} from "Redux/Actions"
import {
    CommonLoadingComponent,
} from "Components"
import * as PageMap from "Pages"


const AppParent = (SonComponent:any)=>{
    class PackageComponent extends Component<any>{

        state = {

        }

        UNSAFE_componentWillMount(){

        }

        //组件挂载完成调用
        componentDidMount(){
            window.mui.init();
            //初始化区域滚动
            window.mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
            //解决登陆页面图标丢失
            window.mui("input").input();
        }

        render(){
            const loading = true;
            return (
                <>
                    {
                        loading ? (
                            <SonComponent {...Object.assign(
                                {
                                    ...this.props,
                                },
                                {},
                                {}
                            )}></SonComponent>
                        ) : (
                            <CommonLoadingComponent></CommonLoadingComponent>
                        )
                    }
                </>
            )
        }

    }

    return connect( (store:RootStore)=>({
        RandomKeyStore: store.RandomKeyStore,
        PrivateStructStore: store.PrivateStructStore,
    }),{
        ImportPrivateKeyAction,
        RemovePrivateKeyAction,
    } )( withRouter<any,any>( PackageComponent ) )
} 

class App extends Component<any>{

    render(){
        return (
            <>
                <Switch>
                    {/*首页*/}
                    <Route exact path="/" component={PageMap.HomePage}></Route>
                    <Route exact path="/rotate" component={PageMap.HomeRotatePage}></Route>

                    {/*TRON网络*/}
                    {/* <Route exact path="/import_tron_private" component={PageMap.ImportTronPrivatePage}></Route>
                    <CheckTronPrivateRoute exact path="/money_tron_info" component={PageMap.MoneyTronInfoPage}></CheckTronPrivateRoute>
                    <CheckTronPrivateRoute exact path="/transfer_tron" component={PageMap.TransferTronPage}></CheckTronPrivateRoute>
                    <CheckTronPrivateRoute exact path="/sign_tron" component={PageMap.SignTronPage}></CheckTronPrivateRoute> */}

                    <Redirect to="/" />
                </Switch>
            </>
        )
    }

}

export default AppParent( App );