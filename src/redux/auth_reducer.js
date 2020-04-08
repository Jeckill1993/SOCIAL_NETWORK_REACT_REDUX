const SET_USER_DATA = 'SET-USER-DATA';

export const setAuthUserData = (userId, login, email) => ({
    type: SET_USER_DATA,
    data: {userId, login, email},
})

let initialState = {
    userId: null,
    login: null,
    email: null,
    isFetching: false,
    isAuth: false,
}


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true,
            }
        default:
            return state;
    }
}

export default authReducer;