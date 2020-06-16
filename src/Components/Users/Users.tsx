import React from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User/User';
import classes from './Users.module.css';
import {UserType} from "../../redux/users_reducer";

type PropsType = {
    onPageChanged: (page: number | undefined) => void,
    currentPage: number
    totalUsersCount: number
    pageSize: number
    portionSize: number
    users: Array<UserType>
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    theme: string
}

const Users: React.FC<PropsType> = ({onPageChanged, currentPage, totalUsersCount, pageSize, portionSize, users, followingInProgress, unfollow, follow, theme}) => {
    return (
        <div>
            <Paginator onPageChanged={onPageChanged} currentPage={currentPage} totalUsersCount={totalUsersCount} pageSize={pageSize} portionSize={portionSize} theme={theme}/>
            <div className={classes.usersList}>
                {users.map((user) =>
                    <User user={user} followingInProgress={followingInProgress} unfollow={unfollow} follow={follow} key={user.id} theme={theme}/>)}
            </div>
            <Paginator onPageChanged={onPageChanged} currentPage={currentPage} totalUsersCount={totalUsersCount} pageSize={pageSize} portionSize={portionSize} theme={theme}/>
        </div>
    )
}

export default Users;