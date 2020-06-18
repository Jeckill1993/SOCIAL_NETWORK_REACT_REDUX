import React from 'react';
import {setCurrentPage, UserType} from '../../redux/users_reducer';
import {followUserThunkCreator} from '../../redux/users_reducer';
import {unfollowUserThunkCreator} from '../../redux/users_reducer';
import {toogleFollowingProgress} from '../../redux/users_reducer';
import {getUsersThunkCreator} from '../../redux/users_reducer';
import {connect} from 'react-redux';
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


type MapStatePropsType = {
    currentPage: number
    pageSize: number
    portionSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UserType>
    followingInProgress: Array<number>
    theme: string
}
type MapDispatchPropsType = {
    setCurrentPage: (page: number | undefined) => void
    getUsers: (currentPage: number |undefined, pageSize: number) => void
    toogleFollowingProgress: (isFetching: boolean, userId: number) => void
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }
    onPageChanged = (page: number | undefined) => {
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
                // @ts-ignore
                   isFetching={this.props.isFetching}
                   followingInProgress={this.props.followingInProgress}
                   toogleFollowingProgress={this.props.toogleFollowingProgress}
                   portionSize={this.props.portionSize}
                   theme={this.props.theme}/>
        </>
    }
}



let mapStateToProps = (state: AppStateType): MapStatePropsType => {
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


export default compose(
    // @ts-ignore
    connect<MapDispatchPropsType, MapDispatchPropsType, AppStateType>(mapStateToProps, {
        setCurrentPage,
        toogleFollowingProgress,
        getUsers: getUsersThunkCreator,
        follow: followUserThunkCreator,
        unfollow: unfollowUserThunkCreator
    }),
    withAuthRedirect,
    // @ts-ignore
)(UsersContainer);