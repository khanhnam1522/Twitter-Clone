import React from "react";
import Moment from "react-moment";
import {Link} from "react-router-dom";

import DefaultProfileImg from "../images/default-profile-image.jpg"

const BaseMessage = ({text,username,profileImageUrl,created,message_id}) => (
    <div>
        <li className="list-group-item">
            <img src={profileImageUrl || DefaultProfileImg} alt={username} height="100" weight="100" className="timeline-image"/>
            <div className="message-area">
                <Link to={`/users/${username}/messages/${message_id}`}>@{username} &nbsp;</Link>
                <span className="text-muted">
                    <Moment toNow>{created}</Moment>
                </span>
                <p>{text}</p>
            </div>
        </li>

    </div>
)

export default BaseMessage;