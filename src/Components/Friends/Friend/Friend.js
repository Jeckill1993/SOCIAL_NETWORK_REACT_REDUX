import React from 'react';
import classes from '../Friends.module.css';


const Friend = (props) => {
    return (
        <div>
            <img className={classes.img_item} src={props.avatar} alt="avatar_friend"/>
            <p className={classes.name}>{props.fullname}</p>
        </div>
    )
}

export default Friend;