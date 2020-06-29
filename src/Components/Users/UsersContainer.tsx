import React from 'react';
import {usersActions, UserType} from '../../redux/users_reducer';
import {followUserThunkCreator} from '../../redux/users_reducer';
import {unfollowUserThunkCreator} from '../../redux/users_reducer';
import {getUsersThunkCreator} from '../../redux/users_reducer';
import {connect, ConnectedProps} from 'react-redux';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import {withAuthRedirect} from '../../hoc/withAuthRedirect'
import {compose} from 'redux';
import {getUsersSelector} from '../../redux/users_selectors';
import {getPageSize} from '../../redux/users_selectors';
import {getTotalUsersCount} from '../../redux/users_selectors';
import {getCurrentPage} from '../../redux/users_selectors';
import {getIsFetching} from '../../redux/users_selectors';
import {getFollowingInProgress} from '../../redux/users_selectors';
import {AppStateType} from "../../redux/redux_store";

class UsersContainer extends React.Component<PropsFromRedux> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (page: number) => {
        this.props.setCurrentPage(page);
        this.props.getUsers(page, this.props.pageSize);
    }

    render() {

        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   isFetching={this.props.isFetching}
                   followingInProgress={this.props.followingInProgress}
                   portionSize={this.props.portionSize}
                   theme={this.props.theme}/>
        </>
    }
}


let mapStateToProps = (state: AppStateType) => {
    return {
        users: getUsersSelector(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        portionSize: state.usersPage.portionSize,
        theme: state.app.theme,
    }
}
type PropsFromRedux = ConnectedProps<typeof connector>

let connector = connect(mapStateToProps, {
    setCurrentPage: usersActions.setCurrentPage,
    toogleFollowingProgress: usersActions.toogleFollowingProgress,
    getUsers: getUsersThunkCreator,
    follow: followUserThunkCreator,
    unfollow: unfollowUserThunkCreator
})

export default compose<React.ComponentType>(
    connector,
    withAuthRedirect,
)(UsersContainer);