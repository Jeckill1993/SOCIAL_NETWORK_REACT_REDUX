import React from 'react';
import '../../../../global_colors.css';
import classes from '../Myposts.module.css';
import like from '../../../../assets/images/like.png';
import dislike from '../../../../assets/images/dislike.png';


const Post = ({name, message, photo}) => {
    return (
        <div className={`${classes.item} runnyTheme_border`}>
            <div className={classes.itemInfo}>
                <img src={photo} alt="avatar"/>
                <span>{name}</span>
            </div>
            <div>
                <div >{message}</div>
                <div className={classes.itemLikeDislike}>
                    <img className={classes.likeDislike} src={like} alt='like'/>
                    <img className={classes.likeDislike} src={dislike} alt='dislike'/>
                </div>
            </div>
        </div>
    )
}

export default Post;