import React from 'react';
import classes from './Post.module.css'

let obj = {
    name: 'Kristian',
    age: '30',

}


const Post = (props) => {
    return (
        <div className="posts">
            <div className={classes.item}>
                <img src="https://pics.livejournal.com/automary/pic/0002yrwa/s320x240" alt="avatar"></img>
                {props.name} - Post 1
                <div>{props.message}</div>
                <div><span className="like">like {props.like} </span><span className="dislake">dislake</span></div>
            </div>
        </div>
    )
}

export default Post;