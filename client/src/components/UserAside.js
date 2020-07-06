import React from 'react'
import DefaultProfileImg from "../images/default-profile-image.jpg"

const UserAside = ({profileImageUrl,username, created}) => {
    //convert string time to the form Month - Year
    const date = new Date(created);
    const year = date.getFullYear();
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    const month = monthNames[date.getMonth()];
    return (
    <aside className="col-2">
        <div className="userProfile">
            <div className="info">
                <img src={profileImageUrl || DefaultProfileImg} alt={username} className="img-thumbnail" width="400" height="400"/>
                <h5 className="username">{username}</h5>
                <i className="far fa-calendar-alt"></i>
                <span>Joined {month} {year}</span>  
            </div>
        </div>
    </aside>
)};

export default UserAside;