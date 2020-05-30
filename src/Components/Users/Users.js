import React from 'react';
import Paginator from '../common/Paginator/Paginator.js';
import User from './User/User.js';
import classes from './Users.module.css';


const Users = ({ onPageChanged, currentPage, totalUsersCount, pageSize, portionSize, users, followingInProgress, unfollow, follow, theme}) => {
    return (
        <div>
            <Paginator onPageChanged={onPageChanged} currentPage={currentPage} totalUsersCount={totalUsersCount} pageSize={pageSize} portionSize={portionSize} theme={theme}/>
            <div className={classes.usersList}>
                {users.map((user) =>
                    <User user={user} followingInProgress={followingInProgress} unfollow={unfollow} follow={follow} key={user.id} theme={theme}/>)}
            </div>
            <Paginator onPageChanged={onPageChanged} currentPage={currentPage} totalUsersCount={totalUsersCount} pageSize={pageSize} portionSize={portionSize} theme={theme}/>
        </div >
    )
}

export default Users;