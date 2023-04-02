import { combineReducers } from "redux";
import authReducer from "./auth"
import currentUserReducer from "./currentUser"
import questionsReducer from "./questions";
import usersReducer from "./users";
import messageReducer from "./messageReducer";
import subscriptionReducer from "./subscriptionReducer";

export default combineReducers({
    authReducer,currentUserReducer,questionsReducer,usersReducer,messageReducer,subscriptionReducer
})