import {ResultCodeEnum, usersAPI} from '../API/api';
import {updateObjectInArray} from '../tools/object-helpers.js';
import {PhotosType} from './profile_reducer';
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionTypes} from "./redux_store";
import {Dispatch} from "redux";


export type UserType = {
    name: string
    id: number
    photos: PhotosType | null
    status: string | null,
    "followed": boolean
}

type ActionTypes = InferActionTypes<typeof usersActions>
type DispatchType = Dispatch<ActionTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

export const usersActions = {
    followUser: (userId: number) => ({
        type: 'social-network/users/FOLLOW',
        userId,
    } as const),
    unfollowUser: (userId: number) => ({
        type: 'social-network/users/UNFOLLOW',
        userId,
    } as const),
    setUsers: (users: Array<UserType>) => ({
        type: 'social-network/users/SET-USERS',
        users,
    } as const),
    setCurrentPage: (pageNumber: number) => ({
        type: 'social-network/users/SET-CURRENT-PAGE',
        page: pageNumber,
    } as const),
    setTotalUserCount: (totalCount: number) => ({
        type: 'social-network/users/SET_TOTAL_USER_COUNT',
        totalCount,
    } as const),
    toogleIsFetching: (isFetching: boolean) => ({
        type: 'social-network/users/TOGGLE-IS-FETCHING',
        isFetching,
    } as const),
    toogleFollowingProgress: (isFetching: boolean, userId: number) => ({
        type: 'social-network/users/TOGGLE-IS-FOLLOWING-PROGRESS',
        isFetching,
        userId,
    } as const),
}

//thunk creator, side effect
export const getUsersThunkCreator = (currentPage: number | undefined, pageSize: number): ThunkType => {
    return async (dispatch) => {
        dispatch(usersActions.toogleIsFetching(true));
        let usersData = await usersAPI.getUsers(currentPage, pageSize);
        dispatch(usersActions.toogleIsFetching(false));
        dispatch(usersActions.setUsers(usersData.items));
        dispatch(usersActions.setTotalUserCount(usersData.totalCount));
    }
}
export const followUserThunkCreator = (userId: number): ThunkType => {
    return async (dispatch) => {
        let apiMethod = usersAPI.makeFollow.bind(userId);
        let actionCreator = usersActions.followUser;
        followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
    }
}
export const unfollowUserThunkCreator = (userId: number): ThunkType => {
    return async (dispatch) => {
        let apiMethod = usersAPI.deleteFollow.bind(userId);
        let actionCreator = usersActions.unfollowUser;
        followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
    }
}

//function
const followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any, actionCreator: (userId: number) => ActionTypes) => {
    dispatch(usersActions.toogleFollowingProgress(true, userId));
    let data = await apiMethod(userId);
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(actionCreator(userId));
    }
    dispatch(usersActions.toogleFollowingProgress(false, userId));
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

const UsersReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case "social-network/users/FOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true}),
            }
        case "social-network/users/UNFOLLOW":
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false}),
            }
        case "social-network/users/SET-USERS":
            return {
                ...state,
                users: action.users,
            }
        case "social-network/users/SET-CURRENT-PAGE":
            return {
                ...state,
                currentPage: action.page,
            }
        case "social-network/users/SET_TOTAL_USER_COUNT":
            return {
                ...state,
                totalUsersCount: action.totalCount,
            }
        case "social-network/users/TOGGLE-IS-FETCHING":
            return {
                ...state,
                isFetching: action.isFetching
            }
        case "social-network/users/TOGGLE-IS-FOLLOWING-PROGRESS":
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