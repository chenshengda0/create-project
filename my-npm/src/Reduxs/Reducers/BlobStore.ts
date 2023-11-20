const initState = {
    dataURL: ""
}

export default function BlobStore(state = initState, actions:any){
    switch(true){
        case actions.type === SET_BLOB_STORE:
            return {
                ...state,
                ...actions.data,
            }
        default:
            return state;
    }
}