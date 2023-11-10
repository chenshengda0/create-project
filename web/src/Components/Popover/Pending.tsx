import {Component} from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {Drawer} from "antd"
import {
    CommonLoadingComponent,
} from "Components"

const PendingParent = function(SonComponent:any){

    class PackageComponent extends Component<any>{

        render(){
            const {
                drawerStatus = 1<<20,
                closeCall = ()=>{
                    console.log( "關閉按鈕未定義" )
                }
            } = this.props;
            return (
                <>
                    <Drawer 
                        placement="bottom" 
                        maskClosable = {false}

                        closable={false}

                        title = "交易上鏈中"

                        onClose={()=>{
                            closeCall();
                        }}


                        headerStyle = {{
                            borderTopLeftRadius: "10px",
                            borderTopRightRadius: "10px",
                            textAlign: "center",
                            background: "#FFF",
                        }}

                        bodyStyle={{
                            background: "#FFF",
                            padding: "0"
                        }}


                        maskStyle={{
                            background: "rgba(0,0,0,0.7)",
                        }}

                        open={!!(1 << 20 & drawerStatus)}
                    >
                        <SonComponent {...Object.assign(
                            {
                                ...this.props,
                            },
                            {
    
                            },
                            {
    
                            }
                        )}></SonComponent>
                    </Drawer>
                </>
            )
        }

    }

    return connect(
        (store:RootStore) =>({

        }),{

        }
    )( withRouter<any,any>( PackageComponent ) )

}

class Pending extends Component<any>{

    render(){
        return (
            <>
                <CommonLoadingComponent></CommonLoadingComponent>
            </>
        )
    }

}

export default PendingParent( Pending )