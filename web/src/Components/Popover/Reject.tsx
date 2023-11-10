import {Component} from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import {Drawer} from "antd"
import styled from "styled-components"
import rejectPng from "./static/reject.png"

const StatusIcon = styled.div`
    width: 100%;
    height: 200px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

const StatusBottom = styled.div`
    height: 80px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 0;
    left: 0;

    .innerBox{
        height: 50px;
        width: 94%;

        .title{
            height: 30px;
            width: 100%;
            line-height: 30px;
            font-weight: 400;
            color: #2B2B2B;
            font-size: 20px;
            text-align: center;
        }

        .content{
            height: 20px;
            width: 100%;
            line-height: 20px;
            font-weight: 400;
            color: #797878;
            font-size: 11px;
            text-align: center;
        }
    }
`

const RejectParent = function( SonComponent:any ){

    class PackageComponent extends Component<any>{

        render(){
            const {
                drawerStatus = 1<<30,
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

                        title = "交易失敗"

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

                        open={!!(1 << 30 & drawerStatus)}
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
        (store:RootStore) => ({

        }),{

        }
    )( withRouter<any,any>( PackageComponent ) )

}

class Reject extends Component<any>{

    render(){
        return (
            <>
                <StatusIcon className="mui-content">
                    <img src={rejectPng} alt="reject" style={{
                        height: "108px",
                        width: "133px",
                    }} />
                </StatusIcon>

                <StatusBottom className="mui-content">
                    <div className="mui-row innerBox">
                        <div className="mui-row title">
                            交易失敗！
                        </div>
                        <div className="mui-row content">
                            您的交易發送失敗了，請檢查帳戶手續費餘額～
                        </div>
                    </div>
                </StatusBottom>
            </>
        )
    }

}

export default RejectParent( Reject )