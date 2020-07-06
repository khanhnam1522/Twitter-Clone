import {LOAD_COMMENTS} from "../actionTypes"

const comment = (state=[], action) => {
    switch(action.type){
        case LOAD_COMMENTS:
            return action.comment;
        default:
            return state;
    }
}

export default comment;