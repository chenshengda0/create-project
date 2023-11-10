import {combineReducers} from "redux"
import {RandomKeyStore} from "./RandomKeyReducer"
import {PrivateStructStore} from "./PrivateStructReducer"
import {SourceEvent as SourceStore} from "./SourceReducer"

export default combineReducers({
    SourceStore,

    //初始化随机 key 与 iv
    RandomKeyStore,
    
    //私钥及链参数
    PrivateStructStore,
});