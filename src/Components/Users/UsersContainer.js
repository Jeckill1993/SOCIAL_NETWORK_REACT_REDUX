import React from 'react';
import Users from './Users.js';
import { followAC } from '../../redux/users_reducer.js';
import { unfollowAC } from '../../redux/users_reducer.js';
import { setUsers } from '../../redux/users_reducer.js';
import { setCurrentPage } from '../../redux/users_reducer.js';
import { setTotalUserCount } from '../../redux/users_reducer.js';
import { connect } from 'react-redux';


let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        followUser: (userId) => {
            dispatch(followAC(userId));
        },
        unfollowUser: (userId) => {
            dispatch(unfollowAC(userId));
        }, 
        setUsers: (users) => {
            dispatch(setUsers(users));
        },
        setCurrentPage: (pageNumber) => {
            dispatch(setCurrentPage(pageNumber));
        },
        setTotalUserCount: (totalCount) => {
            dispatch(setTotalUserCount(totalCount));
        }
    }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;