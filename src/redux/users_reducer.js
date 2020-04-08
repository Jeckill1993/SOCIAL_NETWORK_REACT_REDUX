const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USER_COUNT = 'SET_TOTAL_USER_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE-IS-FOLLOWING-PROGRESS';

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

let initialState = {
    users: [],
    pageSize: 20,
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
                users: state.users.map((user) => {
                    if (user.id === action.userId) {
                        return { ...user, followed: true }
                    }
                    return user;
                }),
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map((user) => {
                    if (user.id === action.userId) {
                        return { ...user, followed: false }
                    }
                    return user;
                }),
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
                : [...state.followingInProgress.filter(id => id != action.userId) ]
            }
        default:
            return state;
    }
}


export default UsersReducer;