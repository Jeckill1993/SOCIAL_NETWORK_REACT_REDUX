import React from 'react';
import classes from './Friend.module.css';


let Friend = (props) => {
    return (
        <div>
            <img className={classes.img_item} src={props.avatar} alt="avatar_friend"></img>
            <p>{props.fullname}</p>
        </div>
    )
}

export default Friend;