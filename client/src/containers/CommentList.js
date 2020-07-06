import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchComments} from "../store/actions/messages";
import {removeMessage, likeMessage} from "../store/actions/messages"

// import DefaultProfileImg from "../images/default-profile-image.jpg"
// import CommentItem from '../components/CommentItem';
import BaseMessage from '../components/BaseMessage';
import CommentItem from '../components/CommentItem';
// import MessageItem from '../components/MessageItem';

//TODO
class CommentList extends Component{
    componentDidMount(){
        this.props.fetchComments(this.props.message_id,this.props.user_id);
    }
    render(){
        console.log(this.props);
        
        const {comment} = this.props;
        return(
            <div>
                {(comment.length!==0 && (
                    <BaseMessage
                        text={comment.text}
                        username={comment.user.username}
                        profileImageUrl = {comment.user.profileImageUrl}
                        key={comment._id} 
                        date={comment.created} 
                        message_id = {comment._id}
                        created = {comment.created}
                    />
                ))}
                {(comment.length!==0 && (
                    comment.comments.map(c =>(
                        <CommentItem
                            key = {c._id}
                            created = {c.created}
                            profileImageUrl={c.user.profileImageUrl}
                            username={c.user.username}
                            text = {c.text}
                            message_id = {c._id}
                        />))
                ))}
            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        comment: state.comment,
        currentUser: state.currentUser.user.id
    };
}

export default connect(mapStateToProps, {fetchComments,likeMessage,removeMessage})(CommentList);
