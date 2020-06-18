import React from 'react';
import '../../../../global_colors.css';
import classes from '../Myposts.module.css';
import userPhoto from "../../../../assets/images/user.jpg";
import runnyTheme_like from '../../../../assets/images/runnyTheme_like.png';
import runnyTheme_dislike from '../../../../assets/images/runnyTheme_dislike.png';
import woodyTheme_like from '../../../../assets/images/woodyTheme_like.png';
import woodyTheme_dislike from '../../../../assets/images/woodyTheme_dislike.png';

type PropsType = {
    name: string
    message: string
    photo: string | null
    id: number
    theme: string
}

const Post: React.FC<PropsType> = ({name, message, photo, id, theme}) => {
    // @ts-ignore
    let likeCount = +localStorage.getItem(`${id}_like`);
    // @ts-ignore
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

                    <img className={classes.likeDislike} onClick={() => {
                        localStorage.setItem(`${id}_like`,
                            // @ts-ignore
                            likeCount++)
                    }}
                         src={theme === 'runnyTheme' ? runnyTheme_like : woodyTheme_like}
                         alt='like'/><span>{likeCount}</span>
                    <img className={classes.likeDislike} onClick={() => {
                        localStorage.setItem(`${id}_dislike`,
                            // @ts-ignore
                            dislikeCount++)
                    }}
                         src={theme === 'runnyTheme' ? runnyTheme_dislike : woodyTheme_dislike}
                         alt='dislike'/><span>{dislikeCount}</span>
                </div>
            </div>
        </div>
    )
}

export default Post;