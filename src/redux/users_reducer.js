import { usersAPI } from '../API/api.js';
import { updateObjectInArray } from './../tools/object-helpers.js';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USER_COUNT = 'SET_TOTAL_USER_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE-IS-FOLLOWING-PROGRESS';


//actionCreator-ы, в которые мы передаем название action, диспатчим именно их
export const followUser = (userId) => ({
    type: FOLLOW,
    userId,
});
export const unfollowUser = (userId) => ({
    type: UNFOLLOW,
    userId,
});
export const setUsers = (users) => ({
    type: SET_USERS,
    users,
});
export const setCurrentPage = (pageNumber) => ({
    type: SET_CURRENT_PAGE,
    page: pageNumber,
});
export const setTotalUserCount = (totalCount) => ({
    type: SET_TOTAL_USER_COUNT,
    totalCount,
});
export const toogleIsFetchung = (isFetching) => ({
    type: TOGGLE_IS_FETCHING,
    isFetching,
});
export const toogleFollowingProgress = (isFetching, userId) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId,
});


const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toogleFollowingProgress(true, userId));

    let data = await apiMethod(userId);
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toogleFollowingProgress(false, userId));
}


//thunkCreator, в котором используется замыкание, чтоб функция thunk могла получить данные
export const getUsersThunkCreator = (currentPage, pageSize) => {
    return async (dispatch) => {
        dispatch(toogleIsFetchung(true));
        let data = await usersAPI.getUsers(currentPage, pageSize);
        dispatch(toogleIsFetchung(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUserCount(data.totalCount));
    }
}
export const followUserThunkCreator = (userId) => {
    return async (dispatch) => {
        let apiMethod = usersAPI.makeFollow.bind(userId);
        let actionCreator = followUser;
        followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
    }
}
export const unfollowUserThunkCreator = (userId) => {
    return async (dispatch) => {
        let apiMethod = usersAPI.deleteFollow.bind(userId);
        let actionCreator = unfollowUser;
        followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
    }
}


let initialState = {
    users: [],
    pageSize: 20,
    portionSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [],
};

const UsersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true}),
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false}),
            }
        case SET_USERS:
            return {
                ...state,
                users: action.users,
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.page,
            }
        case SET_TOTAL_USER_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalCount,
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : [...state.followingInProgress.filter(id => id != action.userId)]
            }
        default:
            return state;
    }
}




export default UsersReducer;