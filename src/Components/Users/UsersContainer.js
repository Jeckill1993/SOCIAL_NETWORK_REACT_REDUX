import React from 'react';
import { followUser } from '../../redux/users_reducer.js';
import { unfollowUser } from '../../redux/users_reducer.js';
import { setUsers } from '../../redux/users_reducer.js';
import { setCurrentPage } from '../../redux/users_reducer.js';
import { setTotalUserCount } from '../../redux/users_reducer.js';
import { toogleIsFetchung } from '../../redux/users_reducer.js';
import { connect } from 'react-redux';
import * as Axios from 'axios';
import Users from './Users.js';
import Preloader from './../common/Preloader/Preloader.js';



class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.toogleIsFetchung(true);
        Axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
            this.props.toogleIsFetchung(false);
            this.props.setUsers(response.data.items);
            this.props.setTotalUserCount(response.data.totalCount);
        });
    }
    onPageChanged = (page) => {
        this.props.toogleIsFetchung(true);
        this.props.setCurrentPage(page);
        Axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsers(response.data.items);
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
                isFetching={this.props.isFetching} />
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
    }
}

UsersContainer = connect(mapStateToProps, {
    followUser, unfollowUser, setUsers, setCurrentPage, setTotalUserCount, toogleIsFetchung,
}
)(UsersContainer);

export default UsersContainer;