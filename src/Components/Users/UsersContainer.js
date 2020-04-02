import React from 'react';
import Users from './Users.js';
import { followAC } from '../../redux/users_reducer.js';
import { unfollowAC } from '../../redux/users_reducer.js';
import { setUsers } from '../../redux/users_reducer.js'
import { connect } from 'react-redux';


let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
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
    }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;