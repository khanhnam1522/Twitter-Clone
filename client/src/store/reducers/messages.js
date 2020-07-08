import {LOAD_MESSAGES, REMOVE_MESSAGES, LIKE_MESSAGES, LOADING} from "../actionTypes"

const message = (state={loading:true,mess: []}, action) => {
    switch(action.type){
        case LOADING:
            return {loading: true, mess:[]};
        case LOAD_MESSAGES:
            return {loading:false, mess:[...action.messages]};
        case REMOVE_MESSAGES:
            return {loading:false, mess: state.mess.filter(message => message._id !== action.id)};
        case LIKE_MESSAGES:
            var i = 0;
            for(; i < state.mess.length; i++){
                if (state.mess[i]._id === action.id.message_id){
                    break;
                }
            }
            if(state.mess[i].likedUsers.includes(action.id.user_id)){
                var index = state.mess[i].likedUsers.indexOf(action.id.user_id);
                state.mess[i].likedUsers.splice(index,1);
                return {loading: false, mess:[
                    ...state.mess.slice(0,i),
                    {...state.mess[i], like: state.mess[i].like - 1},
                    ...state.mess.slice(i+1)]
                }
            } else {
                state.mess[i].likedUsers.push(action.id.user_id);
                return { loading:false, mess : [
                    ...state.mess.slice(0,i),
                    {...state.mess[i], like: state.mess[i].like + 1},
                    ...state.mess.slice(i+1)]
                }
            }
        default:
            return state;
    }
}

export default message;