import {Component} from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import styled from "styled-components"
import Typist from "react-typist"

const Header = styled.div`
    background: #F4F4F4;
    height: 44px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    box-shadow: 0 1px 6px #ccc;

    .mui-row{
        width: 94%;
        height: 100%;

        .left{
            height: 44px;
            display: flex;
            flex-direction: row;
            align-items: center;
            //justify-content: center;
        }

        .mui-col-xs-8{
            height: 44px;
            line-height: 44px;
            text-align: center;
            font-size: 17px;
            font-weight: 500;
            color: #3D3D3D;
        }
    }
`

const HeaderComponentParent = function(SonComponent:any){
    class PackageComponent extends Component<any>{

        render(){
            return (
                <>
                    <SonComponent {...Object.assign(
                        {
                            ...this.props
                        },
                        {

                        },
                        {

                        }
                    )}></SonComponent>
                </>
            )
        }

    }

    return connect(
        (store:RootStore)=>({

        }),{

        }
    )( withRouter<any,any>( PackageComponent ) )
}

class HeaderComponen extends Component<any>{

    render(){
        const {
            title = "多签钱包",
        } = this.props;
        //console.error( this.props )
        return (
            <>
                {/* <Typist cursor={{
                    show: true,
                    blink: true,
                    hideWhenDone: true,
                    hideWhenDoneDelay: 1000,
                }}>
                    
                </Typist> */}
                <Header className="mui-content">
                    <div className="mui-row">
                        <div className="mui-col-xs-2 left">

                        </div>
                        <div className="mui-col-xs-8">
                            {title}
                        </div>
                        <div className="mui-col-xs-2"></div>
                    </div>
                </Header>  
            </>
        )
    }

}

export default HeaderComponentParent( HeaderComponen );