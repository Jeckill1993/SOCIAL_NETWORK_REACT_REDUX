import React from 'react';
import classes from './Friends.module.css';
import Friend from './Friend/Friend.js';


let Friends = (props) => {
    let friendsData = props.friends.map((friend) => {
        return <Friend id={friend.id} key={friend.id} avatar={friend.avatar} fullname={friend.fullname} />
    });

    return (
        <div className={classes.container}>
            {friendsData}
        </div>
    )
}

export default Friends;