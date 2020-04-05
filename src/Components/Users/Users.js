import React from 'react';
import userPhoto from '../../assets/images/user.jpg';
import classes from './Users.module.css';
import { NavLink } from 'react-router-dom';


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
                    return <span onClick={() => {props.onPageChanged(page)}} className={props.currentPage === page && classes.selected}>{page}</span>
                })}
            </div>
            {
                props.users.map((user) => <div key={user.id}>
                    <span>
                        <div>
                           <NavLink to={`profile/${user.id}`}><img className={classes.userPhoto} src={user.photos.small != null ? user.photos.small : userPhoto} alt="avatar"></img></NavLink> 
                        </div>
                        <div>
                            {user.followed ? <button onClick={() => { props.unfollowUser(user.id) }}>UnFollow</button>
                                : <button onClick={() => { props.followUser(user.id) }}>Follow</button>}
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