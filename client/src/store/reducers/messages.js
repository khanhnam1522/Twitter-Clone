import {LOAD_MESSAGES, REMOVE_MESSAGES, LIKE_MESSAGES} from "../actionTypes"

const message = (state=[], action) => {
    switch(action.type){
        case LOAD_MESSAGES:
            return [...action.messages];
        case REMOVE_MESSAGES:
            return state.filter(message => message._id !== action.id);
        case LIKE_MESSAGES:
            var i = 0;
            for(; i < state.length; i++){
                if (state[i]._id === action.id.message_id){
                    break;
                }
            }
            if(state[i].likedUsers.includes(action.id.user_id)){
                var index = state[i].likedUsers.indexOf(action.id.user_id);
                state[i].likedUsers.splice(index,1);
                return [
                    ...state.slice(0,i),
                    {...state[i], like: state[i].like - 1},
                    ...state.slice(i+1),
                ]
            } else {
                state[i].likedUsers.push(action.id.user_id);
                return [
                    ...state.slice(0,i),
                    {...state[i], like: state[i].like + 1},
                    ...state.slice(i+1),
                ]
            }

        default:
            return state;
    }
}

export default message;