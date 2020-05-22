import React from 'react';
import Paginator from '../common/Paginator/Paginator.js';
import User from './User/User.js';
import classes from './Users.module.css';


const Users = ({ onPageChanged, currentPage, totalUsersCount, pageSize, portionSize, users, followingInProgress, unfollow, follow }) => {
    return (
        <div>
            <Paginator onPageChanged={onPageChanged} currentPage={currentPage} totalUsersCount={totalUsersCount} pageSize={pageSize} portionSize={portionSize} />
            <div className={classes.usersList}>
                {users.map((user) =>
                    <User user={user} followingInProgress={followingInProgress} unfollow={unfollow} follow={follow} key={user.id} />)}
            </div>
            <Paginator onPageChanged={onPageChanged} currentPage={currentPage} totalUsersCount={totalUsersCount} pageSize={pageSize} portionSize={portionSize} />
        </div >
    )
}

export default Users;