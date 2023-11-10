import {combineReducers} from "redux"
import {RandomKeyStore} from "./RandomKeyReducer"
import {PrivateStructStore} from "./PrivateStructReducer"

export default combineReducers({
    //初始化随机 key 与 iv
    RandomKeyStore,
    
    //私钥及链参数
    PrivateStructStore,
});