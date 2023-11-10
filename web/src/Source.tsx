import {Component} from "react"
import {withRouter} from "react-router-dom"
import {connect} from "react-redux"
import {
    InitSourceEventAction,
    AddSourceEventAction,
} from "Redux/Actions"

const SourceParent = function(SonComponent:any){
    class PackageComponent extends Component<any>{

        state = {
            InitSourceEventActionState: false,
        }

        async UNSAFE_componentWillMount(){
            const InitSourceEventActionState = await this.props.InitSourceEventAction()
            this.setState({
                InitSourceEventActionState,
            })
        }

        render(){
            const loading = this.state.InitSourceEventActionState;
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
                        ) : (<>loading</>)
                    }

                </>
            )
        }
    } 
    return connect(
        (store:RootStore) => ({
            SourceStore: store.SourceStore
        }),{
            InitSourceEventAction,
            AddSourceEventAction,
        }
    )( withRouter<any,any>( PackageComponent ) )
}

class Source extends Component<any>{

    UNSAFE_componentWillMount(){
        const source=new EventSource(process.env.REACT_APP_SOURCE_URL as string);
        source.addEventListener( "message", (event)=>{
            const param = JSON.parse( event.data )
            this.props.AddSourceEventAction( param.data )
        } )
    }

    render(){
        return (
            <>
            </>
        )
    }
}

export default SourceParent( Source );