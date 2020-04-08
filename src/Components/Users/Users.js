import React from 'react';
import userPhoto from '../../assets/images/user.jpg';
import classes from './Users.module.css';
import { NavLink } from 'react-router-dom';
import * as Axios from 'axios';
import { usersAPI } from '../../API/api';


const Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div>
            <div>
                {pages.map((page) => {
                    return <span onClick={() => { props.onPageChanged(page) }} className={props.currentPage === page && classes.selected}>{page}</span>
                })}
            </div>
            {
                props.users.map((user) => <div key={user.id}>
                    <span>
                        <div>
                            <NavLink to={`profile/${user.id}`}><img className={classes.userPhoto} src={user.photos.small != null ? user.photos.small : userPhoto} alt="avatar"></img></NavLink>
                        </div>
                        <div>
                            {user.followed ? <button disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => {
                                props.toogleFollowingProgress(true, user.id);
                                usersAPI.deleteFollow(user.id)
                                    .then(data => {
                                        if (data.resultCode === 0) {
                                            props.unfollowUser(user.id)
                                        }
                                        props.toogleFollowingProgress(false, user.id);
                                    });

                            }}>UnFollow</button>
                                : <button disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => {
                                    props.toogleFollowingProgress(true, user.id);
                                    usersAPI.makeFollow(user.id)
                                        .then(data => {
                                            if (data.resultCode === 0) {
                                                props.followUser(user.id)
                                            }
                                            props.toogleFollowingProgress(false, user.id);
                                        });

                                }}>Follow</button>}
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{user.name}</div>
                            <div>{user.status}</div>
                        </span>
                        <span>
                            <div>{"user.location.country"}</div>
                            <div>{"user.location.city"}</div>
                        </span>
                    </span>
                </div>
                )}
        </div>
    )
}

export default Users;