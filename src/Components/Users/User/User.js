import React from 'react';
import '../../../global_colors.css';
import userPhoto from '../../../assets/images/user.jpg';
import classes from './../Users.module.css';
import {NavLink} from 'react-router-dom';


const User = ({user, followingInProgress, unfollow, follow}) => {
    return (
        <div className={classes.userItem}>
            <div>
                <div>
                    <NavLink to={`profile/${user.id}`}><img className={classes.userPhoto}
                                                            src={user.photos.small != null ? user.photos.small : userPhoto}
                                                            alt="avatar"/></NavLink>
                </div>
                <div className={classes.buttons}>
                    {user.followed
                        ? <button className={`runnyTheme_contentBtn`} disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                            unfollow(user.id);
                        }}>UnFollow</button>
                        : <button className={`runnyTheme_contentBtn`} disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                            follow(user.id);
                        }}>Follow</button>}
                        <NavLink to={`dialogs/${user.id}`}><button className={`runnyTheme_contentBtn`}>Send message</button></NavLink>
                </div>
            </div>
            <div>
                <div>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </div>
                <div>
                    <div>{"user.location.country"}</div>
                    <div>{"user.location.city"}</div>
                </div>
            </div>
        </div>
    )
}

export default User;