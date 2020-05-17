import React from 'react';
import classes from './Post.module.css'

const Post = ({name, message, like}) => {
    return (
        <div className="posts">
            <div className={classes.item}>
                <img src="https://pics.livejournal.com/automary/pic/0002yrwa/s320x240" alt="avatar"/>
                {name}
                <div>{message}</div>
                <div><span className="like">like {like} </span><span className="dislike">dislike</span></div>
            </div>
        </div>
    )
}

export default Post;