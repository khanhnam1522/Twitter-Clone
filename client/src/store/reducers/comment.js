import {LOAD_COMMENTS} from "../actionTypes"

const DEFAULT_STATE = {
    like: 0,
    likedUsers: [],
    created: Date.now(),
    text: "",
    user: {},
    comments: []
}

const comment = (state= DEFAULT_STATE, action) => {
    switch(action.type){
        case LOAD_COMMENTS:
            return action.comment;
        default:
            return state;
    }
}

export default comment;