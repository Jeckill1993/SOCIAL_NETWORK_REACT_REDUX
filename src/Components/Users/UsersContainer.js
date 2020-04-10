import React from 'react';
import { setCurrentPage } from '../../redux/users_reducer.js';
import { followUserThunkCreator } from '../../redux/users_reducer.js';
import { unfollowUserThunkCreator } from '../../redux/users_reducer.js';
import { toogleFollowingProgress } from '../../redux/users_reducer.js';
import { getUsersThunkCreator } from '../../redux/users_reducer.js';
import { connect } from 'react-redux';
import Users from './Users.js';
import Preloader from './../common/Preloader/Preloader.js';
import { withAuthRedirect } from './../../hoc/withAuthRedirect.js'


class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }
    onPageChanged = (page) => {
        this.props.setCurrentPage(page);
        this.props.getUsers(page, this.props.pageSize);
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
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

export default withAuthRedirect(connect(mapStateToProps, {
    setCurrentPage, toogleFollowingProgress, getUsers: getUsersThunkCreator, follow: followUserThunkCreator, unfollow: unfollowUserThunkCreator,
}
)(UsersContainer));