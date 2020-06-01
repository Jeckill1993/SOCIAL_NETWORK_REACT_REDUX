import React from 'react';
import '../../../../global_colors.css';
import classes from '../Myposts.module.css';
import userPhoto from "../../../../assets/images/user.jpg";
import runnyTheme_like from '../../../../assets/images/runnyTheme_like.png';
import runnyTheme_dislike from '../../../../assets/images/runnyTheme_dislike.png';
import woodyTheme_like from '../../../../assets/images/woodyTheme_like.png';
import woodyTheme_dislike from '../../../../assets/images/woodyTheme_dislike.png';


const Post = ({name, message, photo, theme}) => {
    return (
        <div className={`${classes.item} ${theme}_border`}>
            <div className={classes.itemInfo}>
                <img src={photo || userPhoto} alt="avatar"/>
                <span>{name}</span>
            </div>
            <div>
                <div >{message}</div>
                <div className={classes.itemLikeDislike}>
                    <img className={classes.likeDislike} src={theme === 'runnyTheme' ? runnyTheme_like : woodyTheme_like} alt='like'/>
                    <img className={classes.likeDislike} src={theme === 'runnyTheme' ? runnyTheme_dislike : woodyTheme_dislike} alt='dislike'/>
                </div>
            </div>
        </div>
    )
}

export default Post;