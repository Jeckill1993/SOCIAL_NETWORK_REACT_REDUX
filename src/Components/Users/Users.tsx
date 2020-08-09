import React, {useEffect} from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User/User';
import classes from './Users.module.css';
import {
    followUserThunkCreator,
    getUsersThunkCreator,
    unfollowUserThunkCreator,
    usersActions,
} from "../../redux/users_reducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage, getFollowingInProgress, getIsFetching,
    getPageSize,
    getPortionSize,
    getTotalUsersCount,
    getUsersSelector
} from "../../redux/users_selectors";
import Preloader from "../common/Preloader/Preloader";
import {getTheme} from "../../redux/global_selectors";

type PropsType = {}

const Users: React.FC<PropsType> = (props) => {

    const isFetching = useSelector(getIsFetching);
    const users = useSelector(getUsersSelector);
    const currentPage = useSelector(getCurrentPage);
    const totalUsersCount = useSelector(getTotalUsersCount);
    const pageSize = useSelector(getPageSize);
    const portionSize = useSelector(getPortionSize);
    const followingInProgress = useSelector(getFollowingInProgress);
    const theme = useSelector(getTheme);

    const dispatch = useDispatch();

    const setCurrentPage = (page: number) => {
        dispatch(usersActions.setCurrentPage(page));
    }
    const onPageChanged = (page: number) => {
        setCurrentPage(page);
        dispatch(getUsersThunkCreator(page, pageSize));
    }
    const getUsers = (currentPage: number | undefined, pageSize: number) => {
        dispatch(getUsersThunkCreator(currentPage, pageSize))
    }
    const follow = (userId: number) => {
        dispatch(followUserThunkCreator(userId));
    }
    const unfollow = (userId: number) => {
        dispatch(unfollowUserThunkCreator(userId))
    }

    useEffect(() => {
        getUsers(currentPage, pageSize);
    }, [])


    return (
        <div>
            {isFetching ? <Preloader/> : <div>
                <Paginator onPageChanged={onPageChanged} currentPage={currentPage} totalUsersCount={totalUsersCount}
                           pageSize={pageSize} portionSize={portionSize} theme={theme}/>
                <div className={classes.usersList}>
                    {users.map((user) =>
                        <User user={user} followingInProgress={followingInProgress} unfollow={unfollow} follow={follow}
                              key={user.id} theme={theme}/>)}
                </div>
                <Paginator onPageChanged={onPageChanged} currentPage={currentPage} totalUsersCount={totalUsersCount}
                           pageSize={pageSize} portionSize={portionSize} theme={theme}/>
            </div>}

        </div>
    )
}

export default Users;
