import React from 'react';
import { followUser } from '../../redux/users_reducer.js';
import { unfollowUser } from '../../redux/users_reducer.js';
import { setUsers } from '../../redux/users_reducer.js';
import { setCurrentPage } from '../../redux/users_reducer.js';
import { setTotalUserCount } from '../../redux/users_reducer.js';
import { toogleIsFetchung } from '../../redux/users_reducer.js';
import { toogleFollowingProgress } from '../../redux/users_reducer.js';
import { connect } from 'react-redux';
import * as Axios from 'axios';
import Users from './Users.js';
import Preloader from './../common/Preloader/Preloader.js';
import { usersAPI } from '../../API/api.js';



class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.toogleIsFetchung(true);
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
            this.props.toogleIsFetchung(false);
            this.props.setUsers(data.items);
            this.props.setTotalUserCount(data.totalCount);
        });
    }
    onPageChanged = (page) => {
        this.props.toogleIsFetchung(true);
        this.props.setCurrentPage(page);
        usersAPI.getUsers(page, this.props.pageSize).then(data => {
            this.props.setUsers(data.items);
            this.props.toogleIsFetchung(false);
        });

    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                followUser={this.props.followUser}
                unfollowUser={this.props.unfollowUser}
                isFetching={this.props.isFetching}
                followingInProgress={this.props.followingInProgress}
                toogleFollowingProgress={this.props.toogleFollowingProgress} />
        </>
    }
}


let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
    }
}

export default connect(mapStateToProps, {
    followUser, unfollowUser, setUsers, setCurrentPage, setTotalUserCount, toogleIsFetchung, toogleFollowingProgress,
}
)(UsersContainer);;