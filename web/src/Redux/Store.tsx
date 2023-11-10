import {createStore,applyMiddleware} from "redux"
import Reducers from "./Reduces"
import thunk from "redux-thunk"

export default createStore(Reducers,applyMiddleware(thunk));