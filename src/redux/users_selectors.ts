//reselect is used only for difficult selectors

import { createSelector } from "reselect";
import {AppStateType} from "./redux_store";


export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize;
}
export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount;
}
export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage;
}
export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching;
}
export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress;
}

export const getUsers = (state: AppStateType) => {
    return state.usersPage.users;
}
export const getUsersSelector = createSelector(getUsers, (users) => {
    return users.filter(user => true);
});