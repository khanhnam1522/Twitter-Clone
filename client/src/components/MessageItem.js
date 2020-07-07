import React from "react";
import Moment from "react-moment";
import {Link} from "react-router-dom";
import DefaultProfileImg from "../images/default-profile-image.jpg"

const MessageItem = ({messageID,userID,isLiked,like,created, profileImageUrl, text, username, removeMessage, likeMessage,isCorrectUser,comment, isComment}) => (
    <div>
        <li className="list-group-item">
            <img src={profileImageUrl || DefaultProfileImg} alt={username} height="100" weight="100" className="timeline-image"/>
            <div className="message-area">
                <Link to="/">@{username} &nbsp;</Link>
                <span className="text-muted">
                    <Moment toNow>{created}</Moment>
                </span>
                <p>{text}</p>
                
                {!isComment && 
                    <div>
                        {!isLiked && (<i className="far fa-heart" onClick={likeMessage}></i>)}
                        {isLiked && (<i className="fas fa-heart"  onClick={likeMessage}></i>)}
                        <span className="likeCount">{like}</span>
                        <Link to={`/users/${userID}/messages/${messageID}`}>
                            <i className="fas fa-comment-dots"></i>
                        </Link>

                        <span className="commentCount">{comment}</span>

                        {isCorrectUser && (
                            <i className="far fa-trash-alt" onClick={removeMessage}></i>
                        )}
                    </div>
                }

                
               
            </div>
            
        </li>
    </div>
)

export default MessageItem;