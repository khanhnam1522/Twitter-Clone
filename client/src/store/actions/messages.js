import { apiCall } from "../../services/api";
import {addError} from "./errors";
import {LOAD_MESSAGES, REMOVE_MESSAGES, LIKE_MESSAGES, LOAD_COMMENTS, LOADING} from "../actionTypes";

export const loadMessages = messages => ({
    type: LOAD_MESSAGES,
    messages
});

export const remove = id => ({
    type: REMOVE_MESSAGES,
    id
});

export const like = id => ({
    type: LIKE_MESSAGES,
    id
})

export const loadComments = comment => ({
    type: LOAD_COMMENTS,
    comment
})

export const loading = () => ({
    type: LOADING
})

export const likeMessage = (user_id, message_id) => {
    return dispatch => {
        return apiCall("put", `/api/users/${user_id}/messages/${message_id}`)
            .then(()=> dispatch(like({message_id,user_id})))
            .catch(err => addError(err.message));
    }    
}

export const removeMessage = (user_id, message_id) => {
    return dispatch => {
        return apiCall("delete", `/api/users/${user_id}/messages/${message_id}`)
            .then(()=> dispatch(remove(message_id)))
            .catch(err => addError(err.message));
    }
}

export const fetchMessages = () => {
    return dispatch => {
        return apiCall("get", "/api/messages")
        .then((res) => { 
            dispatch(loadMessages(res));
        })
        .catch((err) => {
            dispatch(addError(err.message));
        });
    };
};

export const fetchComments = (message_id,user_id) =>{
    return dispatch => {
        dispatch(loading()); //Loading starts

        return apiCall("get", `/api/users/${user_id}/messages/${message_id}`)
            .then((res) => { 
                dispatch(loadComments(res));
            })
            .catch((err) => {
                dispatch(addError(err.message));
            }
        );
    }
}

export const postNewMessage = text => (dispatch, getState) => {
    let {currentUser} = getState();
    const id = currentUser.user.id;
    return apiCall("post", `/api/users/${id}/messages`, {text})
        .then(res=>{})
        .catch(err => dispatch(addError(err.message)));
};

export const postNewComment = data => (dispatch, getState) => {
    let {currentUser} = getState();
    const id = currentUser.user.id;
    const message_id = data.message_id;
    const text = data.message;
    return apiCall("post", `/api/users/${id}/messages/${message_id}`, {text})
        .then(res=>{dispatch(fetchComments(message_id,id))})
        .catch(err => dispatch(addError(err.message)));
};