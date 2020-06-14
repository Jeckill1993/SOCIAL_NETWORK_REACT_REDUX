import React from 'react';
import '../../../../global_colors.css';
import classes from '../Myposts.module.css';
import userPhoto from "../../../../assets/images/user.jpg";
import runnyTheme_like from '../../../../assets/images/runnyTheme_like.png';
import runnyTheme_dislike from '../../../../assets/images/runnyTheme_dislike.png';
import woodyTheme_like from '../../../../assets/images/woodyTheme_like.png';
import woodyTheme_dislike from '../../../../assets/images/woodyTheme_dislike.png';


const Post = ({name, message, photo, id, theme}) => {
    let likeCount = +localStorage.getItem(`${id}_like`);
    let dislikeCount = +localStorage.getItem(`${id}_dislike`);
    return (
        <div className={`${classes.item} ${theme}_border`}>
            <div className={classes.itemInfo}>
                <img src={photo || userPhoto} alt="avatar"/>
                <span>{name}</span>
            </div>
            <div>
                <div>{message}</div>
                <div className={classes.itemLikeDislike}>
                    <img className={classes.likeDislike} onClick={() => {localStorage.setItem(`${id}_like`, likeCount++)}}
                         src={theme === 'runnyTheme' ? runnyTheme_like : woodyTheme_like}
                         alt='like'/><span>{likeCount}</span>
                    <img className={classes.likeDislike} onClick={() => {localStorage.setItem(`${id}_dislike`, dislikeCount++)}}
                         src={theme === 'runnyTheme' ? runnyTheme_dislike : woodyTheme_dislike}
                         alt='dislike'/><span>{dislikeCount}</span>
                </div>
            </div>
        </div>
    )
}

export default Post;