import React from 'react';
import '../../../global_colors.css';
import userPhoto from '../../../assets/images/user.jpg';
import classes from './../Users.module.css';
import {NavLink} from 'react-router-dom';
import {UserType} from "../../../redux/users_reducer";

type PropsType = {
    user: UserType
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    theme: string
}

const User: React.FC<PropsType> = ({user, followingInProgress, unfollow, follow, theme}) => {
    // @ts-ignore
    return (
        <div className={classes.userItem}>
            <div>
                <div>
                    <NavLink to={`profile/${user.id}`}><img className={classes.userPhoto}
                        // @ts-ignore
                                                            src={user.photos.small != null ? user.photos.small : userPhoto}
                                                            alt="avatar"/></NavLink>
                </div>
                <div className={classes.buttons}>
                    {user.followed
                        ? <button className={`r${theme}_contentBtn`}
                                  disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                            unfollow(user.id);
                        }}>UnFollow</button>
                        : <button className={`${theme}_contentBtn`}
                                  disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                            follow(user.id);
                        }}>Follow</button>}
                    <NavLink to={`dialogs/${user.id}`}>
                        <button className={`${theme}_contentBtn`}>Send message</button>
                    </NavLink>
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