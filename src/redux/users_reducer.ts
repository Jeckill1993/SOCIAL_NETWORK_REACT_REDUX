import { usersAPI } from '../API/api.js';
import { updateObjectInArray } from '../tools/object-helpers.js';
import { PhotosType } from './profile_reducer.js';

const FOLLOW = 'social-network/users/FOLLOW';
const UNFOLLOW = 'social-network/users/UNFOLLOW';
const SET_USERS = 'social-network/users/SET-USERS';
const SET_CURRENT_PAGE = 'social-network/users/SET-CURRENT-PAGE';
const SET_TOTAL_USER_COUNT = 'social-network/users/SET_TOTAL_USER_COUNT';
const TOGGLE_IS_FETCHING = 'social-network/users/TOGGLE-IS-FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'social-network/users/TOGGLE-IS-FOLLOWING-PROGRESS';


export type UserType = {
    name: string
    id: number
    photos: PhotosType | null
    status: string | null,
    "followed": boolean
}


//action creator, return action
type FollowUserActionType = {
    type: typeof FOLLOW
    userId: number
}
type UnfollowUserActionType = {
    type: typeof UNFOLLOW,
    userId: number,
}
type SetUsersActionType = {
    type: typeof SET_USERS,
    users: Array<UserType>,
}
type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE,
    page: number,
}
type SetTotalUserCountActionType = {
    type: typeof SET_TOTAL_USER_COUNT,
    totalCount: number,
}
type ToogleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean,
}
type ToogleFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}

export const followUser = (userId: number): FollowUserActionType => ({
    type: FOLLOW,
    userId,
});
export const unfollowUser = (userId: number): UnfollowUserActionType => ({
    type: UNFOLLOW,
    userId,
});
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({
    type: SET_USERS,
    users,
});
export const setCurrentPage = (pageNumber: number): SetCurrentPageActionType => ({
    type: SET_CURRENT_PAGE,
    page: pageNumber,
});
export const setTotalUserCount = (totalCount: number): SetTotalUserCountActionType => ({
    type: SET_TOTAL_USER_COUNT,
    totalCount,
});
export const toogleIsFetching = (isFetching: boolean): ToogleIsFetchingActionType => ({
    type: TOGGLE_IS_FETCHING,
    isFetching,
});
export const toogleFollowingProgress = (isFetching: boolean, userId: number): ToogleFollowingProgressActionType => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId,
});

//thunk creator, side effect
export const getUsersThunkCreator = (currentPage: number | undefined, pageSize: number) => {
    return async (dispatch: any) => {
        dispatch(toogleIsFetching(true));
        let data = await usersAPI.getUsers(currentPage, pageSize);
        dispatch(toogleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUserCount(data.totalCount));
    }
}
export const followUserThunkCreator = (userId: number) => {
    return async (dispatch: any) => {
        let apiMethod = usersAPI.makeFollow.bind(userId);
        let actionCreator = followUser;
        followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
    }
}
export const unfollowUserThunkCreator = (userId: number) => {
    return async (dispatch: any) => {
        let apiMethod = usersAPI.deleteFollow.bind(userId);
        let actionCreator = unfollowUser;
        followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
    }
}

//function
const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, actionCreator: any) => {
    dispatch(toogleFollowingProgress(true, userId));
    let data = await apiMethod(userId);
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toogleFollowingProgress(false, userId));
}

type InitialStateType = {
    users: Array<UserType>
    pageSize: number
    portionSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>,
}
let initialState = {
    users: [],
    pageSize: 60,
    portionSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [],
};

const UsersReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
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
                    : [...state.followingInProgress.filter(id => id !== action.userId)]
            }
        default:
            return state;
    }
}


export default UsersReducer;