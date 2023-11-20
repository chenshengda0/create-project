import {
    legacy_createStore,
    combineReducers,
    applyMiddleware,
} from "redux"
import thunk from "redux-thunk"
import {
    BlobStore,
    ColorStore,
} from "./Reducers"

const store = legacy_createStore( combineReducers({
    BlobStore,
    ColorStore,
}), applyMiddleware( thunk ) )

//监听数据发生变化
store.subscribe( ()=>{
    window.storeData = store.getState()
    console.log( store.getState() )
    window.dispatchEvent( new CustomEvent( "updateStore", {
        detail: store.getState()
    } )  )
} )

export default store;