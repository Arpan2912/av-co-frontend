import { combineReducers } from "redux";
import headerReducer from "./header-reducer";

export default combineReducers({
    headerReducer: headerReducer,
})