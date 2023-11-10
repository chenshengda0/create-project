import {Component} from "react"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import iconObj from "./static/load.png"
import styled, { keyframes } from "styled-components"

const LoadingRun = keyframes`
    from{
        background-position: 0px 0px;
    }

    to{
        background-position: -5376px 0px;
    }
`;

const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Wrapper = styled.div`
    width:  96px;
    height: 96px;
    border-radius: 3px;
    overflow: hidden;
`

const LoadingInfo = styled.div`
    width: 100%;
    height: 100%;
    background: url(${iconObj}) no-repeat;
    background-position: 0px 0px;
    animation: ${LoadingRun} 3s steps(56,end) 0s infinite both;
`

class Loading extends Component<any>{

    render(){
        return (
            <>
                <Container className="mui-content">
                    <Wrapper>
                        <LoadingInfo></LoadingInfo>
                    </Wrapper>
                </Container>
            </>
        );
    }

}



export default connect(
    (store:RootStore)=>({

    }),{

    }
)( withRouter<any,any>( Loading ) )