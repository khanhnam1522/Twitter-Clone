import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchMessages, removeMessage, likeMessage} from "../store/actions/messages"
import MessageItem from "../components/MessageItem"

class MessageList extends Component{

    componentDidMount(){
        this.props.fetchMessages();
    }
    render(){
        console.log(this.props);
        const { likeMessage,removeMessage, currentUser} = this.props;
        const messages = this.props.messages.mess;
        const isLoading = this.props.messages.loading;
        let messageList = messages.map(m=>( 
            <MessageItem 
                key={m._id} 
                date={m.createAt} 
                created = {m.created}
                like = {m.like}
                text={m.text}
                username={m.user.username}
                likeMessage = {likeMessage.bind(this, currentUser, m._id)}
                profileImageUrl={m.user.profileImageUrl}
                removeMessage={removeMessage.bind(this, m.user._id, m._id)}
                isCorrectUser={currentUser === m.user._id}
                isLiked = {m.likedUsers.includes(currentUser) ? true : false}
                userID = {m.user._id}
                messageID = {m._id}
                comment = {m.comments.length}
                isComment = {false}
            />
        ));
        return (
            <div className="row col-8">
                <div className="offset-1 col-sm-10">
                    <ul className="list-group" id="messages">
                        {!isLoading ? 
                            (<div>{messageList}</div>) :
                            (<div class="circle"></div>)
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        messages: state.messages,
        currentUser: state.currentUser.user.id
    };
}

export default connect(mapStateToProps, {fetchMessages,removeMessage,likeMessage})(MessageList);