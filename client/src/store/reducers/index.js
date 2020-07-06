import {combineReducers} from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import messages from "./messages"
import comment from "./comment";

const rootReducer = combineReducers({
    currentUser,
    errors,
    messages,
    comment
});

export default rootReducer;